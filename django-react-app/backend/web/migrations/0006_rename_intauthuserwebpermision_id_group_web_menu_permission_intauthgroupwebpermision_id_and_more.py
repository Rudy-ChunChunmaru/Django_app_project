# Generated by Django 5.0.7 on 2024-08-22 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_group_web_menu_permission'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group_web_menu_permission',
            old_name='intAuthUserWebPermision_id',
            new_name='intAuthGroupWebPermision_id',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='intdjangoContentType_id',
            new_name='intdjangoContentType',
        ),
        migrations.AlterField(
            model_name='menu',
            name='strWebMenu_childernId',
            field=models.IntegerField(null=True),
        ),
    ]