# Generated by Django 4.2.11 on 2024-04-22 23:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rylamain', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users_available',
            old_name='staff',
            new_name='is_staff',
        ),
    ]
