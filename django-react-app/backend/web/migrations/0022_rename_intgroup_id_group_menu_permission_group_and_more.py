# Generated by Django 5.1.2 on 2024-10-25 08:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0021_rename_intuser_id_user_menu_permission_user_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group_menu_permission',
            old_name='intGroup_id',
            new_name='Group',
        ),
        migrations.RenameField(
            model_name='group_menu_permission',
            old_name='intMenu_id',
            new_name='Menu',
        ),
        migrations.RenameField(
            model_name='group_menu_permission',
            old_name='intAuthGroupPermision_id',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='strMenu_category',
            new_name='Menu_category',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='intMenu_childernId',
            new_name='Menu_childernId',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='intMenu_rank',
            new_name='Menu_rank',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='strMenu_route',
            new_name='Menu_route',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='strMenu_title',
            new_name='Menu_title',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='intMenu_id',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='user_menu_permission',
            old_name='menu',
            new_name='Menu',
        ),
        migrations.RenameField(
            model_name='user_menu_permission',
            old_name='intAuthUserPermision_id',
            new_name='id',
        ),
    ]
