from django.urls import path
from .views import api_list_customers, api_show_customer

urlpatterns = [
    path("", api_list_customers, name="api_customers"),
    path("<int:pk>/", api_show_customer, name="api_customer"),
]