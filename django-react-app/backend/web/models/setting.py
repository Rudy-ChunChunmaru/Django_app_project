from django.db import models
from django.contrib.auth.models import User,Group

# Create your models here.
class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    Menu_category = models.CharField(max_length=50,null=True,blank=True)
    Menu_title = models.CharField(max_length=50,null=True,blank=True)

    class Meta:
        permissions = []

    def __str__(self):
        return "{'id':%s,'title':%s}" % (self.id, self.Menu_title)
    

class UserMenuPermission(models.Model):
    id = models.AutoField(primary_key=True)
    Menu = models.ForeignKey(to=Menu,related_name='FK_UserMenuPermission_Menu',on_delete=models.RESTRICT,unique=True)
    User = models.ForeignKey(to=User,related_name='FK_UserMenuPermission_User',on_delete=models.RESTRICT,unique=True)

    class Meta:
        permissions = []
        unique_together = ['Menu', 'User']
        ordering = ['Menu']

    def __str__(self):
        return "%s | %s | %s" % (self.id, self.Menu, self.User)

class GroupMenuPermission(models.Model):
    id = models.AutoField(primary_key=True)
    Menu = models.ForeignKey(to=Menu,on_delete=models.RESTRICT,unique=True)
    Group = models.ForeignKey(to=Group,on_delete=models.RESTRICT,unique=True)

    class Meta:
        permissions = []
        unique_together = ['Menu', 'Group']
        ordering = ['Menu']

    def __str__(self):
        return "%s | %s | %s" % (self.id, self.Menu, self.Group)


