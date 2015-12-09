from rest_framework import serializers
from midburn.models import User,Camp,CampLocation,CampMember,CampSafety,Workshop

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

class CampSerializer(serializers.ModelSerializer):
    main_contact = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

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
