from django.contrib.auth.models import User,Group
from rest_framework import serializers

from .models import Menu,UserMenuPermission,GroupMenuPermission
from django.contrib.auth.hashers import make_password



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","password","first_name","last_name","email","is_staff","is_superuser","is_active","date_joined","last_login"]
        extra_kwargs = {"password" : {"write_only" : True}}

    def create(self,validated_data):
        user = User.objects.create(**validated_data)
        return user

    def update(self,instance,validated_data):
        instance.username = validated_data.get('username',instance.username)
        instance.save()
        return instance

    def delete(self,instance):
        instance.delete()

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class UserGroupSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True,read_only=True)

    class Meta:
        model = User
        fields = ["id","username","first_name","last_name","groups"]

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id','Menu_title','Menu_route','Menu_rank','Menu_childernId']

class UserMenuPermissionSerializer(serializers.ModelSerializer):
    Menu = MenuSerializer(many=False, read_only=True)
    class Meta:
        model = UserMenuPermission
        fields = ['id','Menu']

class GroupMenuPermissionSerializer(serializers.ModelSerializer):
    Menu = MenuSerializer(many=False, read_only=True)
    class Meta:
        model = GroupMenuPermission
        fields = ['id','Menu']


# TODO-1: GET USER Auth Detail Info 
class UserAuthDetailInfoSerializer(serializers.Serializer):
    def __init__(self,username):
        self.username = username
        
    def resultUser(self):
        datauser = self.findUser()
        datagrop = self.findGrop()
        if(datauser):
            return {
                'status':True,
                'user': datauser,
                'group': datagrop,
                'menus': self.findMenu(datauser['id'],datagrop),
            }
        else:
            return {
                'status':False,
                'msg': 'username not found !!!' 
            }
    
    def findUser(self):
        return UserSerializer(User.objects.filter(username=self.username).first(),many=False).data
    
    def findGrop(self):
        data = UserGroupSerializer(User.objects.filter(username=self.username).first(),many=False).data
        return data['groups']
    
    def findMenu(self,userID,groups):
        listMenuFromUserMenuPermission = UserMenuPermissionSerializer(UserMenuPermission.objects.filter(User=userID),many=True).data
        listMenuFromGroupMenuPermission = []
        for group in groups:
            listMenuGroup = GroupMenuPermissionSerializer(GroupMenuPermission.objects.filter(Group=group['id']),many=True).data
            for listmenu in listMenuGroup:
                if(listmenu['Menu'] not in listMenuFromGroupMenuPermission):
                    listMenuFromGroupMenuPermission.append(listmenu['Menu'])

        AllListMenu = []
        for listmenuuser in listMenuFromUserMenuPermission:
            if(listmenuuser['Menu'] not in AllListMenu):
                AllListMenu.append(listmenuuser['Menu'])
        for listmenugroup in listMenuFromGroupMenuPermission:
            if(listmenugroup not in AllListMenu):
                AllListMenu.append(listmenugroup)

        return AllListMenu
        


    
   
        
    

    

    
    