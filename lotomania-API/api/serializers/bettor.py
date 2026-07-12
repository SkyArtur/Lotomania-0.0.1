from decimal import Decimal

from django.contrib.auth.password_validation import validate_password
from django.db.models import Sum
from rest_framework import serializers

from core.models import BettorUser, BetPrize

__all__ = ['BettorSerializer', 'BettorRegisterSerializer', 'BettorProfileSerializer']


class BettorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BettorUser
        fields = ['id', 'username']
        read_only_fields = ['id', 'username']


class BettorProfileSerializer(BettorSerializer):
    total_wagered = serializers.SerializerMethodField()
    total_prizes = serializers.SerializerMethodField()

    class Meta(BettorSerializer.Meta):
        fields = BettorSerializer.Meta.fields + ['total_wagered', 'total_prizes']

    def get_total_wagered(self, obj):
        total = obj.bets.aggregate(total=Sum('value'))['total']
        return total or Decimal('0.00')

    def get_total_prizes(self, obj):
        total = BetPrize.objects.filter(bet__bettor=obj).aggregate(total=Sum('value'))['total']
        return total or Decimal('0.00')


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
