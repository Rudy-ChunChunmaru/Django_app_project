from django.contrib.auth.models import User,Group
from rest_framework import serializers

from .models import Menu,User_menu_permission,Group_menu_permission
from django.contrib.auth.hashers import make_password

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
        fields = ["id","username","first_name","last_name","groups"]

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id','Menu_title','Menu_route']

class UserMenuPermissionSerializer(serializers.ModelSerializer):
    User = UserSerializer(many=False, read_only=True)
    Menu = MenuSerializer(many=False, read_only=True)
    class Meta:
        model = User_menu_permission
        fields = ['id',
        'User',
        'Menu'
        ]

class GroupMenuPermissionSerializer(serializers.ModelSerializer):
    Group = GroupSerializer(many=False, read_only=True)
    Menu = MenuSerializer(many=False, read_only=True)
    class Meta:
        model = Group_menu_permission
        fields = ['id',
        'Group',
        'Menu'
        ]


# TODO-1: GET USER Auth Detail Info 
class UserAuthDetailInfoSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True,read_only=True)
    user_menu_permissions = serializers.SlugRelatedField(many=True,read_only=True,slug_field='Menu')

    class Meta:
        model=User
        fields = [
            "id","username","first_name","last_name",
            "groups",
            "user_menu_permissions",
        ]
        


    
   
        
    

    

    
    