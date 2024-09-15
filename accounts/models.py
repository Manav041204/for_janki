from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CommonUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class CommonUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=10)
    house_number = models.CharField(max_length=50)
    no_family_memebers = models.BigIntegerField(default=0)

    is_active = models.BooleanField(default=True)
    is_committee = models.BooleanField(default=False)
    is_resident = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CommonUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class Resident(models.Model):
    cuser = models.OneToOneField(CommonUser, on_delete=models.CASCADE, related_name='resident_profile')

    def str(self):
        return f"{self.cuser.name} - {self.cuser.house_number}"

class Committee(models.Model):
    cuser = models.OneToOneField(CommonUser, on_delete=models.CASCADE, related_name='committee_profile')
    
    def str(self):
        return f"{self.cuser.name}"

class Security(models.Model):
    name = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=10)
    password = models.CharField(max_length=255)
    shift = models.CharField(max_length=20)
    gateno_duty = models.CharField(max_length=50)

    def str(self):
        return f"{self.name}"
    
class Apartment(models.Model):
    house_number = models.CharField(max_length=10, unique=True)
    total_members = models.BigIntegerField()
    total_vehicels = models.BigIntegerField()
    total_workers = models.BigIntegerField()
    total_pets = models.BigIntegerField()
    
class DailyHelp(models.Model):
    added_by = models.ForeignKey(CommonUser, on_delete=models.CASCADE, related_name='daily_helps')
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name='daily_helps')
    name = models.CharField(max_length=100)
    job = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    
class Vehicle(models.Model):
    resident = models.ForeignKey(CommonUser, on_delete=models.CASCADE, related_name='vehicles')
    house_no = models.ForeignKey(Apartment)
    vehicle_type = models.CharField(max_length=20)
    license_plate = models.CharField(max_length=20, unique=True)
    
class Pet(models.Model):
    resident = models.ForeignKey(CommonUser, on_delete=models.SET_NULL, null=True, related_name='pets')
    name = models.CharField(max_length=50)
    animal_type = models.CharField(max_length=50)
    
class Guest(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    entry_initiated = models.ForeignKey(Security, on_delete=models.SET_NULL, null=True, related_name = 'initiated_guest')
    visiting_apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE)
    check_in_time = models.DateTimeField()
    check_out_time = models.DateTimeField(null=True, blank=True)
    approved_by = models.ForeignKey(CommonUser, on_delete=models.SET_NULL, null=True, related_name='approved_guests')