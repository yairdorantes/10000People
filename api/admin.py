from django.contrib import admin
from .models import Person


class PersonAdmin(admin.ModelAdmin):
    search_fields = ['name', 'email', 'phone']


admin.site.register(Person,PersonAdmin)
# Register your models here.
