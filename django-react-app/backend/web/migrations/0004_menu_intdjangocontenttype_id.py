# Generated by Django 5.0.7 on 2024-08-16 08:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('web', '0003_alter_menu_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='menu',
            name='intdjangoContentType_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype'),
        ),
    ]
