# Generated by Django 5.0.7 on 2024-08-16 02:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='web_menu',
            fields=[
                ('intWebMenu_id', models.AutoField(primary_key=True, serialize=False)),
                ('strWebMenu_name', models.CharField(max_length=50)),
                ('strWebMenu_route', models.CharField(max_length=50)),
                ('strWebMenu_childernId', models.IntegerField(default=django.db.models.deletion.SET_NULL, max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='auth_user_web_menu_permission',
            fields=[
                ('intAuthUserWebPermision_id', models.AutoField(primary_key=True, serialize=False)),
                ('intUser_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
                ('intWebMenu_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='web.web_menu')),
            ],
        ),
    ]