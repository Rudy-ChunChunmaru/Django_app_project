from django.contrib.auth.models import User,Group
from rest_framework import serializers

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","first_name","last_name","password"]
        extra_kwargs = {"password" : {"write_only" : True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class UserGroupSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = [
            "id","username","first_name","last_name","password",
            "groups"
            ]

    

    
    