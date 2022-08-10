from django.db import models

# Create your models here.
class Technician(models.Model):
    hourly_rate = models.IntegerField()
    name = models.CharField(max_length=200)
    employee_number = models.IntegerField()
    worked_hours = models.DecimalField(decimal_places=2, max_digits=11)


class SalesPerson(models.Model):
    hourly_rate = models.IntegerField()
    name = models.CharField(max_length=200)
    employee_number = models.IntegerField()
    worked_hours = models.DecimalField(decimal_places=2, max_digits=11)
    commission = models.DecimalField(decimal_places=2, max_digits=11)

    