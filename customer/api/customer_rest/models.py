from django.db import models

# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone =  models.CharField(unique=True, max_length=12)