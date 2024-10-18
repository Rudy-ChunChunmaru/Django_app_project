# Generated by Django 5.1.2 on 2024-10-18 09:32

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('web', '0014_menu_strwebmenu_category'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='group_web_menu_permission',
            new_name='group_menu_permission',
        ),
        migrations.RenameModel(
            old_name='user_web_menu_permission',
            new_name='user_menu_permission',
        ),
        migrations.RenameField(
            model_name='group_menu_permission',
            old_name='intAuthGroupWebPermision_id',
            new_name='intAuthGroupPermision_id',
        ),
        migrations.RenameField(
            model_name='group_menu_permission',
            old_name='intGroup',
            new_name='intGroup_id',
        ),
        migrations.RenameField(
            model_name='group_menu_permission',
            old_name='intWebMenu',
            new_name='intMenu_id',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='intWebMenu_childernId',
            new_name='intMenu_childernId',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='intWebMenu_id',
            new_name='intMenu_id',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='intWebMenu_rank',
            new_name='intMenu_rank',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='strWebMenu_category',
            new_name='strMenu_category',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='strWebMenu_name',
            new_name='strMenu_name',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='strWebMenu_route',
            new_name='strMenu_route',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='strWebMenu_title',
            new_name='strMenu_title',
        ),
        migrations.RenameField(
            model_name='user_menu_permission',
            old_name='intAuthUserWebPermision_id',
            new_name='intAuthUserPermision_id',
        ),
        migrations.RenameField(
            model_name='user_menu_permission',
            old_name='intWebMenu',
            new_name='intMenu_id',
        ),
        migrations.RenameField(
            model_name='user_menu_permission',
            old_name='intUser',
            new_name='intUser_id',
        ),
    ]
