from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from midburn.models import *

class CampSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Camp

    def create(self, validated_data):
        user_id = self.context['request'].user.id
        user = get_object_or_404(User, pk=user_id)
        camp = Camp(**validated_data)
        camp.save()
        camp.users.add(user)
        return camp

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
        fields = ('password', 'email', 'username',)
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)

    def create(self, validated_data):
        user = User(**validated_data)
        # call set_password on user object. Without this the password will be stored in plain text.
        user.set_password(validated_data['password'])
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
