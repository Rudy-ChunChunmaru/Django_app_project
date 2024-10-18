from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import menu,user_menu_permission,group_menu_permission

# Register your models here.
@admin.register(Permission)
class Permission(admin.ModelAdmin):
    list_display = ('id','name', 'codename','content_type_id')

@admin.register(menu)
class menu(admin.ModelAdmin):
    list_display = ('intMenu_id','intMenu_childernId','intMenu_rank','strMenu_title','strMenu_name', 'strMenu_route')

@admin.register(user_menu_permission)
class user_menu_permission(admin.ModelAdmin):
    list_display = ('intAuthUserPermision_id','intMenu_id', 'intUser_id')

@admin.register(group_menu_permission)
class group_menu_permission(admin.ModelAdmin):
    list_display = ('intAuthGroupPermision_id','intMenu_id', 'intGroup_id')