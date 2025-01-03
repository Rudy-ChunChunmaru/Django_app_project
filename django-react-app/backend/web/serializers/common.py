from django.contrib.auth.models import User,Group
from rest_framework import serializers
from web.models.setting import Menu,UserMenuPermission,GroupMenuPermission
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password","first_name","last_name","email","is_staff","is_superuser","is_active"]
        extra_kwargs = {
            "id":{"read_only":True},
            "username" : {"write_only" : True},
            "password" : {"write_only" : True},
            "first_name":{"read_only":True},
            "last_name":{"read_only":True},
            "email":{"read_only":True},
            "is_staff":{"read_only":True},
            "is_superuser":{"read_only":True},
            "is_active":{"read_only":True}
        }

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
        fields = ['id','Menu_category','Menu_title']

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
        


    
   
        
    

    

    
    