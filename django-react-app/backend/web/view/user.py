from rest_framework import generics,status
from rest_framework.response import Response

from rest_framework.permissions import AllowAny,IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
import json

from ..serializer import UserSerializer

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



           
            

# Create your views here.
class ListCreateUserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =[AllowAny]


class GetUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =[AllowAny]

    def get(self,request,id=None,*args, **kwargs):
        if(id):
            user_query = User.objects.filter(id__icontains = id)
        else:
            user_query = User.objects.all()
        result =  UserSerializer(user_query, many=True)
        return Response(data=result.data , status = status.HTTP_200_OK)

