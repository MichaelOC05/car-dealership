from django.urls import path
from .views import api_list_sales_people, api_list_technicians

urlpatterns = [
    path("sales_people/", api_list_sales_people, name="list_salespeople"),
    path("technicians/", api_list_technicians, name="list_technicians"),
]