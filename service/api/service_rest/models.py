from django.db import models

# Create your models here.

class AutomobileVo(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
    color = models.CharField(max_length=50, null=True)
    year = models.PositiveSmallIntegerField(null=True)
    model_name = models.CharField(max_length=100, null=True)
    model_manufacturer = models.CharField(max_length=100, null=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.IntegerField(unique=True)


class TechnicianVO(models.Model):
    hourly_rate = models.IntegerField()
    name = models.CharField(max_length=200)
    employee_number = models.IntegerField(unique=True)
    worked_hours = models.DecimalField(decimal_places=2, max_digits=11)


class CustomerVO(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone =  models.CharField(unique=True, max_length=12)


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(unique=True, max_length=12)


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