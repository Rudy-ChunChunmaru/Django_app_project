# Generated by Django 5.1.2 on 2024-10-21 02:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0015_rename_group_web_menu_permission_group_menu_permission_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('intUser_id', models.AutoField(primary_key=True, serialize=False)),
                ('strUser_username', models.CharField(max_length=50)),
                ('strUser_email', models.EmailField(max_length=50)),
                ('strUser_password', models.CharField(max_length=50)),
                ('strUser_firstname', models.CharField(max_length=50)),
                ('strUser_lastname', models.CharField(max_length=50)),
            ],
        ),
    ]
