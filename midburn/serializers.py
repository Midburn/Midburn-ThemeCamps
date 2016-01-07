from django.contrib.auth.models import User
from rest_framework import serializers
from midburn.models import *

class CampSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camp

class CampLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampLocation

class CampMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampMember

class CampSafetySerializer(serializers.ModelSerializer):
    class Meta:
        model = CampSafety

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password', 'email',)
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)

    def create(self, validated_data):
        # the email is the username
        user = User(**validated_data)
        # call set_password on user object. Without this the password will be stored in plain text.
        user.set_password(validated_data['password'])
        user.username = user.email
        user.save()
        return user

    def update(self, instance, validated_data):
        # call set_password on user object. Without this
        # the password will be stored in plain text.
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.set_password(instance.password)
        instance.save()
        return instance
