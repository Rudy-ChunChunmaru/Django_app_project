# Generated by Django 5.0.7 on 2024-08-16 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_rename_web_menu_menu_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='menu',
            options={'permissions': []},
        ),
        migrations.AlterModelOptions(
            name='user_web_menu_permission',
            options={'permissions': []},
        ),
        migrations.AlterField(
            model_name='menu',
            name='strWebMenu_childernId',
            field=models.IntegerField(max_length=50, null=True),
        ),
    ]