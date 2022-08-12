from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .models import EmployeeVO
# Create your views here.

class EmployeeEncoderVO(ModelEncoder):
    model = EmployeeVO
    properties = ["employee_number", "name", "worked_hours", "commission", "hourly_rate"]


@require_http_methods(["GET"])
def api_list_employeesVO(request):
    try:    
        if request.method == "GET":
            employee_vo = EmployeeVO.objects.all()
            return JsonResponse(
                {"employee_vo": employee_vo},
                encoder=EmployeeEncoderVO,
            )
    except:
        response = JsonResponse(
            {"message": "something went wrong"}
        )
        response.status_code = 400
        return response