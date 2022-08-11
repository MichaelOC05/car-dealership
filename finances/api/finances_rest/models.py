from django.db import models

# Create your models here.

class SaleVO(models.Model):
    automobile_cost = models.DecimalField(max_digits=11, decimal_places=2)
    employee_number = models.IntegerField()
    price = models.DecimalField(max_digits=11, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)


class EmployeeVO(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.IntegerField()
    worked_hours = models.DecimalField(max_digits=11, decimal_places=2)
    hourly_rate = models.IntegerField()
    commission = models.DecimalField(null=True, max_digits=11, decimal_places=2)

class ServiceAppointmentVO(models.Model):
    price = models.DecimalField(decimal_places=2, max_digits=2)
    employee_number = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    cost_of_parts = models.DecimalField(decimal_places=2, max_digits=11)


class PayCheck(models.Model):
    employee_number = models.ForeignKey(
        EmployeeVO,
        related_name="pay_check",
        null=False,
        on_delete=models.PROTECT
    )
    hours_worked = models.DecimalField(max_digits=11, decimal_places=2)
    total = models.DecimalField(max_digits=11, decimal_places=2)