from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import menu,user_web_menu_permission,group_web_menu_permission

# Register your models here.
@admin.register(Permission)
class Permission(admin.ModelAdmin):
    list_display = ('id','name', 'codename','content_type_id')

@admin.register(menu)
class menu(admin.ModelAdmin):
    list_display = ('intWebMenu_id','strWebMenu_name', 'strWebMenu_route','strWebMenu_childernId')

@admin.register(user_web_menu_permission)
class user_web_menu_permission(admin.ModelAdmin):
    list_display = ('intAuthUserWebPermision_id','intWebMenu_id', 'intUser_id')

@admin.register(group_web_menu_permission)
class group_web_menu_permission(admin.ModelAdmin):
    list_display = ('intAuthUserWebPermision_id','intWebMenu_id', 'intGroup_id')