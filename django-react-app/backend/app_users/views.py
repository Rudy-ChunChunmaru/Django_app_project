from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializer import UserSerializer

# Create your views here.
class ListCreateUserView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =[AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"amana"})    


class GetUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =[AllowAny]
