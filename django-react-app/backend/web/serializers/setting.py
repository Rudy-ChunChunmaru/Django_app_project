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
        fields = ["username","first_name","last_name","email","is_staff","is_superuser","is_active","date_joined","last_login"]
        extra_kwargs = {
            "date_joined":{"read_only":True},
            "last_login":{"read_only":True},
        }

class UserChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True,style={"input_type":"password"},write_only=True)
    old_password = serializers.CharField(required=True,style={"input_type":"password"},write_only=True)

