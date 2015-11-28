# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Camp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('camp_name_he', models.CharField(max_length=50, unique=True)),
                ('camp_name_en', models.CharField(max_length=50, unique=True)),
                ('camp_desc_he', models.TextField()),
                ('camp_desc_en', models.TextField()),
                ('camp_status', models.IntegerField(choices=[(-1, 'deleted'), (1, 'open'), (2, 'closed'), (3, 'inactive')])),
                ('is_published', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='CampLocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('camp_type', models.IntegerField(choices=[(1, 'food'), (2, 'drinking/bar'), (3, 'music'), (4, 'workshops'), (5, 'art-supporting'), (6, 'other')])),
                ('camp_type_other', models.TextField()),
                ('camp_activity_time', models.CommaSeparatedIntegerField(max_length=64, choices=[(1, 'morning'), (2, 'noon'), (3, 'evening'), (4, 'night')])),
                ('child_friendly', models.BooleanField()),
                ('noise_level', models.IntegerField(choices=[(1, 'quiet'), (2, 'medium'), (3, 'noisy'), (4, 'very noisy')])),
                ('public_activity_area_sqm', models.IntegerField()),
                ('public_activity_area_desc', models.TextField()),
                ('support_art', models.BooleanField()),
                ('location_comments', models.TextField()),
                ('camp_location_street', models.CharField(max_length=100)),
                ('camp_location_street_time', models.CharField(max_length=100)),
                ('camp_location_area', models.IntegerField()),
                ('arriving_at', models.DateTimeField()),
                ('has_construction_team', models.BooleanField()),
                ('has_deconst_team', models.BooleanField()),
                ('has_gifting', models.BooleanField()),
                ('has_leds', models.BooleanField()),
                ('camp', models.OneToOneField(to='midburn.Camp')),
                ('requested_nearby_camps', models.ManyToManyField(related_name='requested_nearby_camps', to='midburn.Camp')),
            ],
        ),
        migrations.CreateModel(
            name='CampMember',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(choices=[(1, 'not a member'), (2, 'awaiting approval'), (3, 'approved')])),
                ('has_ticket', models.BooleanField()),
                ('early_arrival', models.BooleanField()),
                ('is_editor', models.BooleanField()),
                ('camp', models.ForeignKey(to='midburn.Camp')),
            ],
        ),
        migrations.CreateModel(
            name='CampSafety',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('have_art', models.BooleanField()),
                ('installation_over_2m', models.BooleanField()),
                ('is_gas_2m_from_stove', models.BooleanField()),
                ('is_electricity_not_near_water', models.BooleanField()),
                ('camp', models.OneToOneField(to='midburn.Camp')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=254, unique=True)),
                ('facebook', models.CharField(max_length=254)),
                ('first_name_he', models.CharField(max_length=50)),
                ('last_name_he', models.CharField(max_length=50)),
                ('first_name_en', models.CharField(max_length=50)),
                ('last_name_en', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Workshop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_name_he', models.CharField(max_length=50)),
                ('activity_name_en', models.CharField(max_length=50)),
                ('activity_desc_he', models.TextField()),
                ('activity_desc_en', models.TextField()),
                ('activity_datetime', models.DateTimeField()),
                ('activity_type', models.IntegerField(choices=[(1, 'workshop'), (2, 'party'), (3, 'lecture'), (4, 'show'), (5, 'parade/hike'), (6, 'game'), (7, 'movie'), (8, 'other')])),
                ('activity_type_other', models.TextField()),
                ('adult_only', models.BooleanField()),
                ('child_friendly', models.BooleanField()),
                ('owner', models.ForeignKey(to='midburn.Camp')),
            ],
        ),
        migrations.AddField(
            model_name='campmember',
            name='user',
            field=models.ForeignKey(to='midburn.User'),
        ),
        migrations.AddField(
            model_name='camp',
            name='main_contact',
            field=models.ForeignKey(related_name='main_contact', to='midburn.User'),
        ),
        migrations.AddField(
            model_name='camp',
            name='moop_contact',
            field=models.ForeignKey(related_name='moop_contact', to='midburn.User'),
        ),
        migrations.AddField(
            model_name='camp',
            name='safety_contact',
            field=models.ForeignKey(related_name='safety_contact', to='midburn.User'),
        ),
    ]
