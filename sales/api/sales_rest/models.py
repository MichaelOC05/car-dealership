from django.db import models
from django.urls import reverse

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
    color = models.CharField(max_length=50, null=True)
    year = models.PositiveSmallIntegerField(null=True)
    model_name = models.CharField(max_length=100, null=True)
    model_manufacturer = models.CharField(max_length=100, null=True)

    # def get_api_url(self):
    #     return reverse("Put url name here", kwargs={"pk": self.pk})


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone =  models.IntegerField(unique=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.IntegerField(unique=True)


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        null=False,
        on_delete=models.PROTECT,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_person",
        null=False,
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        null=False,
        on_delete=models.PROTECT
    )
    price = models.DecimalField(decimal_places=2, max_digits=11)