from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import localtime
from datetime import datetime
from login.managers import CustomUserManager

# Create your models here.

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=200,
                                help_text='Enter first name')
    last_name = models.CharField(max_length=200,
                                help_text='Enter last name')
    date_of_birth = models.DateField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=50,
                                    help_text='Enter phone number')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, help_text='Upload avatar')
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'date_of_birth', 'phone_number']

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
