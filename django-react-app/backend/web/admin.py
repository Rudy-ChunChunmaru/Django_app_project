from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import menu,user_web_menu_permission,group_web_menu_permission

# Register your models here.
@admin.register(Permission)
class Permission(admin.ModelAdmin):
    list_display = ('id','name', 'codename','content_type_id')

@admin.register(menu)
class menu(admin.ModelAdmin):
    list_display = ('intWebMenu_id','intWebMenu_childernId','intWebMenu_rank','intDjangoContentType','strWebMenu_title','strWebMenu_name', 'strWebMenu_route')

@admin.register(user_web_menu_permission)
class user_web_menu_permission(admin.ModelAdmin):
    list_display = ('intAuthUserWebPermision_id','intWebMenu', 'intUser')

@admin.register(group_web_menu_permission)
class group_web_menu_permission(admin.ModelAdmin):
    list_display = ('intAuthGroupWebPermision_id','intWebMenu', 'intGroup')