from rest_framework import serializers
from django.contrib.auth.models import User,Group

from web.models.setting import Menu,UserMenuPermission,GroupMenuPermission


class UserGetCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="user_detail",lookup_field="username")
    class Meta:
        model = User
        fields = ["username","password","first_name","last_name","email","is_staff","is_superuser","is_active",
        "url"]
        extra_kwargs = {
            "username":{"required":True},
            "password":{"write_only":True,"required":True},
            "first_name":{"required":True},
            "last_name":{"required":True},
            "email":{"required":False},
            "url":{"read_only":True},
        }

class UserRetrivingUpdateDestroySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","first_name","last_name","email","is_staff","is_superuser","is_active","date_joined","last_login"]
        extra_kwargs = {
            "id":{"read_only":True},
            "date_joined":{"read_only":True},
            "last_login":{"read_only":True},
        }

class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True,style={"input_type":"password"},write_only=True)
    new_password = serializers.CharField(required=True,style={"input_type":"password"},write_only=True)



class GroupGetCreateSerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(view_name="group_detail",lookup_field="name")

    class Meta:
        model = Group
        fields = ['name','user_count','url']
        extra_kwargs = {
            "url":{"read_only":True},
            "user_count":{"read_only":True},
        }

    def get_user_count(self, obj):
        return obj.user_set.count()

class GroupRetrivingUpdateDestroySerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    class Meta:
        model = Group
        fields = ["id","name","user_set","users"]
        extra_kwargs = {
            "user_set":{"write_only":True},
        }

    def get_users(self, obj):
        return UserRetrivingUpdateDestroySerializer(obj.user_set.all(), many=True).data


class MenuGetCreateSerializer(serializers.ModelSerializer):
    url=serializers.HyperlinkedIdentityField(view_name="menu_detail",lookup_field="id")
    class Meta:
        model = Menu
        fields = ["id","Menu_title","Menu_category","url"]
        extra_kwargs = {
            "id":{"read_only":True},
            "url":{"read_only":True},
        }

class MenuRetrivingUpdateDestroySerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ["id","Menu_title","Menu_category"]
        extra_kwargs = {
            "id":{"read_only":True},
        }

class UserMenuPermissionGetCreateDestroySerializer(serializers.ModelSerializer):
    menutitle = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    class Meta:
        model = UserMenuPermission
        fields = ["id","Menu","User","menutitle","username"]
        extra_kwargs = {
            "id":{"read_only":True},
            "Menu":{"write_only":True},
            "menutitle":{"read_only":True},
            "User":{"write_only":True},
            "username":{"read_only":True},
        }

    def get_menutitle(self,obj):
        return obj.Menu.Menu_title

    def get_username(self,obj):
        return obj.User.username

class GroupMenuPermissionGetCreateDestroySerializer(serializers.ModelSerializer):
    menutitle = serializers.SerializerMethodField()
    groupname = serializers.SerializerMethodField()
    class Meta:
        model = GroupMenuPermission
        fields = ["id","Menu","Group","menutitle","groupname"]
        extra_kwargs = {
            "id":{"read_only":True},
            "Menu":{"write_only":True},
            "menutitle":{"read_only":True},
            "Group":{"write_only":True},
            "groupname":{"read_only":True},
        }

    def get_menutitle(self,obj):
        return obj.Menu.Menu_title

    def get_groupname(self,obj):
        return obj.Group.name








    



