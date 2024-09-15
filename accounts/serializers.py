# serializers.py
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CommonUser, Resident, Committee

class CommonUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonUser
        fields = ['id', 'name', 'email', 'phoneNumber', 'password', 'house_number', 'no_family_memebers', 'is_active', 'is_committee', 'is_resident']
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def create(self, validated_data):
        
        validated_data['no_family_memebers'] = CommonUser.objects.all().filter(house_number = validated_data['house_number']).count()
        validated_data['password'] = make_password(validated_data['password'])  # Hash the password
        user = CommonUser(**validated_data)
        user.save()

        # Create Resident or Committee instance if applicable
        if validated_data.get('is_resident'):
            Resident.objects.create(cuser=user)
        if validated_data.get('is_committee'):
            Committee.objects.create(cuser=user, designation=validated_data.get('designation', ''))

        return user

class ResidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resident
        fields = ['id', 'cuser']

class CommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Committee
        fields = ['id', 'cuser']