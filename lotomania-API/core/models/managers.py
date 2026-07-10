from django.contrib.auth.models import BaseUserManager

__all__ = ['BettorUserManager']


class BettorUserManager(BaseUserManager):

    @staticmethod
    def normalize_username(username):
        return str(username).lower()

    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Users must have a username')
        _username = self.normalize_username(username)
        user = self.model(username=_username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)
