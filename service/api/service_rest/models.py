from django.db import models

# Create your models here.

class AutomobileVo(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.IntegerField(unique=True)


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.IntegerField(unique=True)


class ServiceAppointment(models.Model):
    automobile = models.ForeignKey(
        AutomobileVo,
        related_name="service_appointment",
        null=False,
        on_delete=models.PROTECT,
    )
    technician = models.ForeignKey(
        Technician,
        related_name="service_appointment",
        null=False,
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="service_appointment",
        null=False,
        on_delete=models.PROTECT
    )
    reason = models.TextField()
    date_time = models.DateTimeField()
    completed = models.BooleanField(default=False)