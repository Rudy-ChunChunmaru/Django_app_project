# Generated by Django 5.1.2 on 2024-10-18 03:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0012_rename_strwebmenu_childernid_menu_intwebmenu_childernid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menu',
            name='intDjangoContentType',
        ),
    ]
