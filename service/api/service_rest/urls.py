from django.urls import path
from .views import (
    api_list_automobileVOs,
    api_show_automobileVO,
    api_list_customer,
    api_show_customer,
    api_list_technician,
    api_show_technician,
    api_list_service_appointment,
    api_show_service_appointment
)

urlpatterns = [
    path("appointments/", api_list_service_appointment, name="api_appointments"),
    path("appointments/<int:pk>/", api_show_service_appointment, name="api_appointment"),
    path("automobiles/", api_list_automobileVOs, name="api_automobiles"),
    path("automobiles/<str:vin>/", api_show_automobileVO, name="api_automobile"),
    path("customers/", api_list_customer, name="api_customers"),
    path("customers/<int:pk>/", api_show_customer, name="api_customer"),
    path("technicians/", api_list_technician, name="api_technicians"),
    path("technicians/<int:employee_number>/", api_show_technician, name="api_technician")
]