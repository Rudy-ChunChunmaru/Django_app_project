from rest_framework import serializers
from django.contrib.auth.models import User,Group

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","first_name","last_name","email","is_staff","is_superuser","is_active","date_joined","last_login"]
        extra_kwargs = {
            "date_joined":{"read_only":True},
            "last_login":{"read_only":True},
        }