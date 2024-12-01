# TODO Use Simple JWT To Get Token

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate
from rest_framework import mixins,generics,status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from ...serializers.common import UserSerializer,UserAuthDetailInfoSerializer
import jwt


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# -----------------------------------------------------------

class AuthUserLogin(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    serializer_class = UserSerializer
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
                return Response(data={'Error' : 'username and password invalid !!!'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(data={'Error' : 'username and password invalid !!!'}, status=status.HTTP_400_BAD_REQUEST)