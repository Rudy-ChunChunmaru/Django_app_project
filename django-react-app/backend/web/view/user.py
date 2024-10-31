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


class UserView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
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

    def post(self,request,username=None,*args, **kwargs):
        body = request.body
        try:
            data = dict(json.loads(body)) 
            # {"username":"david_mulia","password":"Qwerty@12345","email":"david@test.com","first_name":"david","last_name":"mulia"}
            addNew = UserSerializer(data=data)
            if(addNew.is_valid()):
                addNew.save()
            else:
                return Response(data={'Error' : 'data invalid load data !!!','data':addNewUser.errors} , status = status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(data={'Error' : 'incorrect data load body !!!', 'data':body} , status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'data':'new changes success !!!','data':{}},status = status.HTTP_200_OK)

    def put(self,request,username,*args, **kwargs):
        body = request.body
        try:
            data = dict(json.loads(body)) 
            findData = User.objects.filter(username=username).first()
            if(findData):
                update = UserSerializer(findData,data=data)
                if(update.is_valid()):
                    update.save()
                else:
                    return Response(data={'Error' : 'data invalid load data !!!','data':update.errors} , status = status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response(data={'Error' : 'data not found !!!','data':data} , status = status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={'Error' : 'incorrect data load body !!!', 'data':body} , status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'data':'new changes success !!!','data':{}},status = status.HTTP_200_OK)

    def delete(self,username=None,*args, **kwargs):
        pass

            	
  
            




