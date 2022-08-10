from django.urls import path

from .views import (
    api_list_automobileVOs,
    api_list_customer,
    api_list_sales,
    api_list_sales_persons,
    api_show_customer,
    api_show_automobileVO,
    api_show_sales_person,
    api_show_sale,
    api_list_customerVOs,
    api_show_customerVO,
)

urlpatterns = [
    path("", api_list_sales, name="api_sales"),
    path("<int:pk>/", api_show_sale, name="api_sale"),
    path("customers/", api_list_customerVOs, name="api_customers"),
    path("customers/<int:pk>/", api_show_customerVO, name="api_customer"),
    path("sales_person/", api_list_sales_persons, name="api_sales_persons"),
    path("sales_person/<int:employee_number>/", api_show_sales_person, name="api_sales_person"),
    path("automobiles/", api_list_automobileVOs, name="api_automobiles"),
    path("automobiles/<str:vin>/", api_show_automobileVO, name="api_automobile")
]