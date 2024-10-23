from django import forms
from django.db import models
from django.contrib.auth.models import User,Group
from django.contrib.contenttypes.models import ContentType

# Create your models here.
class menu(models.Model):
    intMenu_id = models.AutoField(primary_key=True)
    strMenu_category = models.CharField(max_length=50,null=True,blank=True)
    strMenu_title = models.CharField(max_length=50,null=True,blank=True)
    strMenu_route = models.CharField(max_length=50,null=True,blank=True)
    intMenu_rank = models.IntegerField(null=True)
    intMenu_childernId = models.IntegerField(null=True,blank=True)

    class Meta:
        permissions = []

    def __str__(self):
        return "%s | %s" % (self.intMenu_id, self.strMenu_name)
    

class user_menu_permission(models.Model):
    intAuthUserPermision_id = models.AutoField(primary_key=True)
    intMenu_id = models.ForeignKey(to=menu,related_name='FK_menus_user_menu_permission',on_delete=models.RESTRICT)
    intUser_id = models.ForeignKey(to=User,on_delete=models.RESTRICT)

    class Meta:
        permissions = []

class group_menu_permission(models.Model):
    intAuthGroupPermision_id = models.AutoField(primary_key=True)
    intMenu_id = models.ForeignKey(to=menu,on_delete=models.RESTRICT)
    intGroup_id = models.ForeignKey(to=Group,on_delete=models.RESTRICT)

    class Meta:
        permissions = []


