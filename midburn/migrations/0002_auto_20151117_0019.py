# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='publish_date',
            new_name='pub_date',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='choice_text',
            new_name='question_text',
        ),
    ]
