from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from core.models.managers import BettorUserManager
from core.utils import validate_username

__all__ = ['BettorUser']


class BettorUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=15, unique=True, validators=[validate_username])
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = BettorUserManager()

    USERNAME_FIELD = 'username'

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

    def __str__(self):
        return self.username
