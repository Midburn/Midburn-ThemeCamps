# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0006_auto_20160116_0842'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camp',
            name='contact_email',
            field=models.CharField(max_length=254, blank=True, unique=True, default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='camp',
            name='contact_facebook',
            field=models.CharField(max_length=254, blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='camp',
            name='contact_name_en',
            field=models.CharField(max_length=50, blank=True),
        ),
        migrations.AlterField(
            model_name='camp',
            name='contact_name_he',
            field=models.CharField(max_length=50, blank=True),
        ),
        migrations.AlterField(
            model_name='camp',
            name='contact_phone',
            field=models.CharField(max_length=50, blank=True, default=''),
            preserve_default=False,
        ),
    ]
