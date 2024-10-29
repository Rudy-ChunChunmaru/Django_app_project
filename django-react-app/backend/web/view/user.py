from rest_framework import generics,status
from rest_framework.response import Response

from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView

from django.contrib.auth.models import User
import json

from ..serializer import UserSerializer


# Create your views here.
# class ListCreateUserView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes =[AllowAny]


# class GetUserView(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes =[AllowAny]

#     def get(self,request,id=None,*args, **kwargs):
#         if(id):
#             user_query = User.objects.filter(id__icontains = id)
#         else:
#             user_query = User.objects.all()
#         result =  UserSerializer(user_query, many=True)
#         return Response(data=result.data , status = status.HTTP_200_OK)


class UserView(APIView):
    permission_classes =[AllowAny]

    def get(self,request,username=None,*args, **kwargs):
        if username != None:
            user_query = User.objects.filter(username=username)
        else:
            rage = 10
            if request.GET.get('page') != None:
                try:
                    limitdata = int(request.GET.get('page')) * rage
                    user_query = User.objects.all()[limitdata-rage:limitdata]
                except:
                    user_query = User.objects.all()[0:rage]
            else:
                user_query = User.objects.all()[0:rage]

        result =  UserSerializer(user_query, many=True)
        return Response(data={'data':result.data} , status = status.HTTP_200_OK)

    def post(self,request,*args, **kwargs):
        return Response(data={'data':'test'},status = status.HTTP_200_OK)




