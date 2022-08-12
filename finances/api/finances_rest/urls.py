from django.urls import path
from .views import api_list_employeesVO
urlpatterns = [
    path("employees/", api_list_employeesVO, name="employees_list")
]