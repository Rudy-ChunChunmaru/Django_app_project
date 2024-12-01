from rest_framework import generics,mixins,status
from rest_framework.response import Response

from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView

from django.contrib.auth.models import User
from ...serializers.setting import UserSerializer
import json

class UserView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =[AllowAny]
    lookup_field='username'

    def get(self,request,*args, **kwargs):
        username = kwargs.get('username')
        if username:
            user_query = User.objects.filter(username=username)
        else:
            # data select
            user_query = User.objects.all()
            # data order

            # data cut
            rage = 6
            if request.GET.get('rage'):
                try:
                    rage = int(request.GET.get('rage'))
                except:
                    rage = 5
            if request.GET.get('page'):
                try:
                    limitdata = int(request.GET.get('page')) * rage
                    user_query = user_query[limitdata-rage:limitdata]
                except:
                    user_query = user_query[0:rage]
            else:
                user_query = user_query[0:rage]

        result = UserSerializer(user_query, many=True)
        return Response(data={'data':result.data} , status = status.HTTP_200_OK)

    def post(self,request,*args, **kwargs):
        body = request.body
        try:
            data = dict(json.loads(body)) 
            add = UserSerializer(data=data)
            if(add.is_valid()):
                self.create(request,*args, **kwargs)
            else:
                return Response(data={'Error' : add.errors} , status = status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(data={'Error' : 'incorrect data load body !!!'} , status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'data':'new changes success !!!'},status = status.HTTP_201_CREATED)

    def put(self,request,*args, **kwargs):
        username = kwargs.get('username')
        body = request.body
        try:
            data = dict(json.loads(body)) 
            findData = User.objects.filter(username=username).first()
            if(findData):
                update = UserSerializer(findData,data=data)
                if(update.is_valid()):
                    self.update(request,*args, **kwargs)
                else:
                    return Response(data={'Error' : update.errors } , status = status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response(data={'Error' : 'data not found !!!'} , status = status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={'Error' : 'incorrect data load body !!!'} , status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'data':'new changes success !!!'},status = status.HTTP_202_ACCEPTED)

    def delete(self,request,*args, **kwargs):
        username = kwargs.get('username')
        try:
            findData = User.objects.filter(username=username).first()
            if(findData):
                self.destroy(request,*args, **kwargs)
            else:
                return Response(data={'data' : 'data not found !!!',} , status = status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={'Error' : 'incorrect data load body !!!',} , status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'data':'data deleted !!!',},status = status.HTTP_202_ACCEPTED)


  
            




