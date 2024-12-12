from rest_framework import generics,filters
from rest_framework.response import Response

from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView

from django.contrib.auth.models import Group
from web.serializers.setting import GroupGetCreateSerializer,GroupRetrivingUpdateDestroySerializer

class GroupView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupGetCreateSerializer
    permission_classes =[AllowAny]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['name',]
    ordering_fields = ['name',]

class GroupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupRetrivingUpdateDestroySerializer
    permission_classes =[AllowAny]
    lookup_field='name'