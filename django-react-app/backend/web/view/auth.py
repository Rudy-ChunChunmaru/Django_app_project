# TODO Use Simple JWT To Get Token
from rest_framework_simplejwt.tokens import RefreshToken
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# -----------------------------------------------------------
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated

from django.contrib.auth.models import User
from ..serializer import UserSerializer,UserMenuPermissionSerializer
from ..models import user_web_menu_permission

class AuthUserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if(username and password):
            user = authenticate(request,username=username,password=password)
            if user is not None:
                queryset = User.objects.filter(username__icontains=user).first()
                resultUser = UserSerializer(queryset)
                # print(resultUser.data['id'])
                resultMenu = UserMenuPermissionSerializer(user_web_menu_permission.objects.filter(intUser_id__icontains=resultUser.data['id']))
                return Response(data={
                    'user': resultUser.data,
                    'menu': resultMenu.data,
                    'token' : get_tokens_for_user(user)
                    }, status=status.HTTP_200_OK)
            else:
                return Response(data={'detail' : 'username and password invalid !!!'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(data={'detail' : 'username and password invalid !!!'}, status=status.HTTP_400_BAD_REQUEST)