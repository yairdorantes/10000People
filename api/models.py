from django.db import models

# Create your models here.


class Person(models.Model):
    name = models.CharField(max_length=100,verbose_name="Nombre")
    # last_name = models.CharField(max_length=100,verbose_name="Apellidos")
    age = models.IntegerField(default=0,verbose_name="Edad")
    email = models.EmailField(max_length=100,verbose_name="Email")
    phone = models.CharField(max_length=100,verbose_name="Telefono")
    
    def __str__(self):
        return self.name
    
