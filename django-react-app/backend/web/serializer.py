from django.contrib.auth.models import User,Group
from rest_framework import serializers

from .models import user,menu,user_menu_permission,group_menu_permission
from django.contrib.auth.hashers import make_password

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["id","username","first_name","last_name","password"]
#         extra_kwargs = {"password" : {"write_only" : True}}


#     def create(self,validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

class UserSerializer(serializers.ModelSerializer):
    strUser_password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        style={'input_type': 'password', 'placeholder': 'Password'}
    )

    class Meta:
        model = user
        fields = ["intUser_id","strUser_username","strUser_email","strUser_password","strUser_firstname","strUser_lastname"]
        extra_kwargs = {"strUser_password" : {"write_only" : True}}

    def create(self, validated_data):
        validated_data['strUser_password'] = make_password(validated_data.get('strUser_password'))
        return super(UserSerializer, self).create(validated_data)



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
    
   
        
    

    

    
    