from django.urls import path
from .views import api_list_sales_people

urlpatterns = [
    path("", api_list_sales_people, name="list_salespeople"),
]