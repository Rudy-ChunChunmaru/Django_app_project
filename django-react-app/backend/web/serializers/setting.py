from rest_framework import serializers
from django.contrib.auth.models import User,Group

class UserGetCreateSerializer(serializers.ModelSerializer):
    user_url = serializers.HyperlinkedIdentityField(view_name="user_detail",lookup_field="username")
    class Meta:
        model = User
        fields = ["username","password","first_name","last_name","email","is_staff","is_superuser","is_active",
        "user_url"]
        extra_kwargs = {
            "username":{"required":True},
            "password":{"write_only":True,"required":True},
            "first_name":{"required":True},
            "last_name":{"required":True},
            "email":{"required":False},
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
    user_url = serializers.HyperlinkedIdentityField(view_name="group_detail",lookup_field="name")

    class Meta:
        model = Group
        fields = ['name','user_count','user_url']
        extra_kwargs = {
            "user_count":{"read_only":True}
        }

    def get_user_count(self, obj):
        return obj.user_set.count()

class GroupRetrivingUpdateDestroySerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    class Meta:
        model = Group
        fields = ["name","user_set","users"]
        extra_kwargs = {
            "user_set":{"write_only":True},
        }

    def get_users(self, obj):
        return UserRetrivingUpdateDestroySerializer(obj.user_set.all(), many=True).data

    



