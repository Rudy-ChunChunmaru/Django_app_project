from rest_framework import generics,filters
from rest_framework.response import Response

from rest_framework.permissions import AllowAny,IsAuthenticated

from web.models.setting import Menu,UserMenuPermission,GroupMenuPermission
from web.serializers.setting import MenuGetCreateSerializer,MenuRetrivingUpdateDestroySerializer,UserMenuPermissionRetrivingGetCreateUpdateDestroySerializer,GroupMenuPermissionRetrivingGetCreateUpdateDestroySerializer

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

class MenuUserPermissionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserMenuPermission.objects.all()
    serializer_class = UserMenuPermissionRetrivingGetCreateUpdateDestroySerializer
    permission_classes =[AllowAny]
    lookup_field='Menu'

class MenuGroupPermissionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GroupMenuPermission.objects.all()
    serializer_class = GroupMenuPermissionRetrivingGetCreateUpdateDestroySerializer
    permission_classes =[AllowAny]
    lookup_field='Menu'