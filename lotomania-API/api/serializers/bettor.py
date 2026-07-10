from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from core.models import BettorUser

__all__ = ['BettorSerializer', 'BettorRegisterSerializer']


class BettorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BettorUser
        fields = ['id', 'username']
        read_only_fields = ['id', 'username']


class BettorRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = BettorUser
        fields = ['id', 'username', 'password']
        read_only_fields = ['id']

    def create(self, validated_data):
        return BettorUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
