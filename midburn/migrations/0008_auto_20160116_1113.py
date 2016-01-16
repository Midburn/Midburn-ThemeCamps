# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0007_auto_20160116_0902'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camp',
            name='contact_email',
            field=models.CharField(blank=True, max_length=254),
        ),
    ]
