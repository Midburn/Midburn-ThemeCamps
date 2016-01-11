# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0002_auto_20151209_1240'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='camp',
            name='main_contact',
        ),
        migrations.RemoveField(
            model_name='campmember',
            name='user',
        ),
        migrations.AddField(
            model_name='camp',
            name='contact_email',
            field=models.CharField(null=True, unique=True, max_length=254),
        ),
        migrations.AddField(
            model_name='camp',
            name='contact_facebook',
            field=models.CharField(null=True, max_length=254),
        ),
        migrations.AddField(
            model_name='camp',
            name='contact_name_en',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='camp',
            name='contact_name_he',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='camp',
            name='contact_phone',
            field=models.CharField(null=True, max_length=50),
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
