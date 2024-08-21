from django.db import models
from django.contrib.auth.models import User,Group
from django.contrib.contenttypes.models import ContentType

# Create your models here.
class menu(models.Model):
    intWebMenu_id = models.AutoField(primary_key=True)
    intdjangoContentType_id = models.ForeignKey(to=ContentType,on_delete=models.CASCADE,null=True,blank=True)
    strWebMenu_name = models.CharField(max_length=50)
    strWebMenu_route = models.CharField(max_length=50)
    strWebMenu_childernId = models.IntegerField(null=True)

    class Meta:
        permissions = []

    def __str__(self):
        return "%s | %s" % (self.intWebMenu_id, self.strWebMenu_name)

class user_web_menu_permission(models.Model):
    intAuthUserWebPermision_id = models.AutoField(primary_key=True)
    intWebMenu_id = models.ForeignKey(to=menu,on_delete=models.RESTRICT)
    intUser_id = models.ForeignKey(to=User,on_delete=models.RESTRICT)

    class Meta:
        permissions = []

class group_web_menu_permission(models.Model):
    intAuthUserWebPermision_id = models.AutoField(primary_key=True)
    intWebMenu_id = models.ForeignKey(to=menu,on_delete=models.RESTRICT)
    intGroup_id = models.ForeignKey(to=Group,on_delete=models.RESTRICT)

    class Meta:
        permissions = []


