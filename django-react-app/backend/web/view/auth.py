# TODO Use Simple JWT To Get Token

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from ..serializer import UserAuthDetailInfoSerializer
import jwt

# TODO-Auth 
# class AuthUser(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes =[AllowAny]

#     def get(self,request,*args, **kwargs):
#         body = request.body
#         data = {}
#         try:
#             data = dict(json.loads(body))
#         except:
#             return Response(data={'Error' : 'incorrect data load body !!!'} , status = status.HTTP_400_BAD_REQUEST)
#         finally:
#             user_query = User.objects.filter(username__icontains = data['username']).first()
#             result =  AuthUserSerializer(user_query)
#             if(bool(result.data['username']) and bool(result.data['password'])):
#                 hashed_password = result.data['password']  # Retrieved from the database
#                 if check_password(data['password'], hashed_password):
#                     print(get_tokens_for_user(result.data))
#                     return Response(
#                         data={
#                             'user_id' : result.data['id'],
#                             'user_name': result.data['first_name'] + result.data['last_name'],
#                             'group': '' 
#                             }, 
#                         status = status.HTTP_200_OK)
#                 else:
#                     return Response(data={'Error' : 'incorrect user or password !!!'} , status = status.HTTP_404_NOT_FOUND)
#             else:
#                 return Response(data={'Error' : 'incorrect user or password !!!'} , status = status.HTTP_404_NOT_FOUND)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# -----------------------------------------------------------

class AuthUserLogin(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        reqUsername = request.data.get('username')
        reqPassword = request.data.get('password')
        if(reqUsername and reqPassword):
            strusername = authenticate(request,username=reqUsername,password=reqPassword)
            if strusername is not None:
             
                return Response(data={
                    'data': jwt.encode(UserAuthDetailInfoSerializer(username=strusername).resultUser(),'secret', algorithm='HS256'),
                    'token' : get_tokens_for_user(strusername)
                    }, status=status.HTTP_200_OK)
            else:
                return Response(data={'detail' : 'username and password invalid !!!'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(data={'detail' : 'username and password invalid !!!'}, status=status.HTTP_400_BAD_REQUEST)