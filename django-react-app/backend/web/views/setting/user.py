from rest_framework import generics,mixins,filters,status
from rest_framework.response import Response

from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView

from django.contrib.auth.models import User

from web.serializers.setting import UserGetCreateSerializer,UserRetrivingUpdateDestroySerializer,UserChangePasswordSerializer
from web.views.common.function import DataProses
import json

class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetCreateSerializer
    permission_classes =[AllowAny]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['username', '^email']
    ordering_fields = ['username','first_name','last_name','email','is_staff','is_superuser','is_active']

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserRetrivingUpdateDestroySerializer
    permission_classes =[AllowAny]
    lookup_field='username'

class UserChangePasswordView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserChangePasswordSerializer
    permission_classes =[AllowAny]
    lookup_field='username'

    def put(self,request,*args,**kwargs):
        username = kwargs['username']
      
        if not request.data.get('password'):
            return Response({'error': 'password is required'}, status=400)
        if not request.data.get('new_password'):
            return Response({'error': 'new_password is required'}, status=400)

        password = request.data['password']
        new_password = request.data['new_password']
        obj = User.objects.get(username=username)
        if not obj.check_password(raw_password=password):
            return Response({'error': 'password not match'}, status=400)
        else:
            obj.set_password(new_password)
            obj.save()
            return Response({'success': 'password changed successfully'}, status=200)




            




