from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):

    def create_user(self, username, email, password, user_type):
        user = self.model(username=username, email=email, user_type=user_type)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save()
        return user

class User(AbstractUser):

    USER_TYPE_CHOICES = (
        ('C', 'customer'),
        ('A', 'agent'),
        ('M', 'manager')
    )

    user_type = models.CharField(
        max_length=1, null=True, choices=USER_TYPE_CHOICES, default='C')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    class Meta:
        db_table = 'User'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']

    def __str__(self):
        return self.username

    def get_email(self):
        return self.email
