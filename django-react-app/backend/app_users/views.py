from rest_framework import generics,status
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializer import UserSerializer

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

