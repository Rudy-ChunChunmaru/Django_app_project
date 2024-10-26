from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import Menu,User_menu_permission,Group_menu_permission

# Register your models here.
@admin.register(Permission)
class Permission(admin.ModelAdmin):
    list_display = ('id','name', 'codename','content_type_id')

@admin.register(Menu)
class Menu(admin.ModelAdmin):
    list_display = ('id','Menu_childernId','Menu_rank','Menu_title','Menu_route')

@admin.register(User_menu_permission)
class User_menu_permission(admin.ModelAdmin):
    list_display = ('id','Menu', 'User')

@admin.register(Group_menu_permission)
class Group_menu_permission(admin.ModelAdmin):
    list_display = ('id','Menu', 'Group')