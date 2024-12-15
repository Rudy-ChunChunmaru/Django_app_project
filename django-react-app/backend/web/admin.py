from django.contrib import admin
from django.contrib.auth.models import Permission
from .models.setting import Menu,UserMenuPermission,GroupMenuPermission

# Register your models here.
@admin.register(Permission)
class Permission(admin.ModelAdmin):
    list_display = ('id','name', 'codename','content_type_id')

@admin.register(Menu)
class Menu(admin.ModelAdmin):
    list_display = ('id','Menu_category','Menu_title')

@admin.register(UserMenuPermission)
class UserMenuPermission(admin.ModelAdmin):
    list_display = ('id','Menu', 'User')

@admin.register(GroupMenuPermission)
class GroupMenuPermission(admin.ModelAdmin):
    list_display = ('id','Menu', 'Group')