from django.contrib import admin

from core.models import BettorUser, Bet

__all__ = ['BettorUserAdmin']

class BetInline(admin.TabularInline):
    model = Bet
    extra = 0

@admin.register(BettorUser)
class BettorUserAdmin(admin.ModelAdmin):
    list_display = ('admin_username', 'admin_is_staff')
    search_fields = ('username',)
    list_per_page = 25
    orders = ('username',)
    inlines = [BetInline]

    @admin.display(description='Usuário', ordering='username')
    def admin_username(self, obj):
        return obj.username

    @admin.display(description='Administrador')
    def admin_is_staff(self, obj):
        return obj.is_staff