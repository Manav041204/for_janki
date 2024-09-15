# admin.py
from django.contrib import admin
from .models import CommonUser, Resident, Committee, Security

admin.site.register(CommonUser)
admin.site.register(Resident)
admin.site.register(Committee)
admin.site.register(Security)