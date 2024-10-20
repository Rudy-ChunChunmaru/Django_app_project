from django.contrib.auth.models import User,Group
from rest_framework import serializers

from .models import menu,user_menu_permission,group_menu_permission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","first_name","last_name","password"]
        extra_kwargs = {"password" : {"write_only" : True}}


    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class UserGroupSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True,read_only=True)

    class Meta:
        model = User
        fields = [
            "id","username","first_name","last_name","groups"
        ]

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = menu
        fields = ['intWebMenu_id','strWebMenu_name','strWebMenu_route']

class UserMenuPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_menu_permission
        fields = [
                'intAuthUserWebPermision_id','intUser_id','intWebMenu_id',
                ]
    
   
        
    

    

    
    