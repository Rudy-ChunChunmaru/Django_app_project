from rest_framework import generics,filters
from rest_framework.response import Response

from rest_framework.permissions import AllowAny,IsAuthenticated

from web.models.setting import Menu,UserMenuPermission,GroupMenuPermission
from web.serializers.setting import MenuGetCreateSerializer,MenuRetrivingUpdateDestroySerializer,UserMenuPermissionGetCreateDestroySerializer,GroupMenuPermissionGetCreateDestroySerializer

class MenuView(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuGetCreateSerializer
    permission_classes =[AllowAny]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['Menu_title',]
    ordering_fields = ['Menu_title',]

class MenuDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuRetrivingUpdateDestroySerializer
    permission_classes =[AllowAny]
    lookup_field='id'

class MenuUserPermissionView(generics.ListCreateAPIView):
    queryset = UserMenuPermission.objects.all()
    serializer_class = UserMenuPermissionGetCreateDestroySerializer
    permission_classes =[AllowAny]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['Menu',]
    ordering_fields = ['Menu',]

class MenuUserPermissionDetailView(generics.RetrieveDestroyAPIView):
    queryset = UserMenuPermission.objects.all()
    serializer_class = UserMenuPermissionGetCreateDestroySerializer
    permission_classes =[AllowAny]
    lookup_field='id'

class MenuGroupPermissionView(generics.ListCreateAPIView):
    queryset = GroupMenuPermission.objects.all()
    serializer_class = GroupMenuPermissionGetCreateDestroySerializer
    permission_classes =[AllowAny]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['Menu',]
    ordering_fields = ['Menu',]

class MenuGroupPermissionDetailView(generics.RetrieveDestroyAPIView):
    queryset = GroupMenuPermission.objects.all()
    serializer_class = GroupMenuPermissionGetCreateDestroySerializer
    permission_classes =[AllowAny]
    lookup_field='id'