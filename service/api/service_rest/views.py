from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from pkg_resources import require
# Create your views here.
from .models import Customer, AutomobileVo, Technician, ServiceAppointment, CustomerVO
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVo
    properties = ["vin", "color", "model_manufacturer", "model_name", "year", "sold"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "name", "address", "phone_number"]


class CustomerVOEncoder(ModelEncoder):
    model = CustomerVO
    properties = ["id", "name", "address", "phone"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = ["id", "customer", "technician", "automobile", "reason", "date_time", "completed"]
    encoders = {"customer": CustomerEncoder(), "technician": TechnicianEncoder(), "automobile": AutomobileVOEncoder()}    


@require_http_methods(["GET", "POST"])
def api_list_automobileVOs(request):
    if request.method == "GET":
        automobileVOs = AutomobileVo.objects.all()
        return JsonResponse(
            {"automobileVOs": automobileVOs},
            encoder=AutomobileVOEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            automobileVO = AutomobileVo.objects.create(**content)
            return JsonResponse(
                automobileVO,
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the automobileVO"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET"])
def api_show_automobileVO(request, vin):
    if request.method == "GET":
        try:
            auto = AutomobileVo.objects.get(vin=vin)
            return JsonResponse(
                auto,
                encoder=AutomobileVOEncoder,
                safe=False
            )
        except AutomobileVo.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            auto = AutomobileVo.objects.get(vin=vin)
            auto.delete()
            return JsonResponse(
                auto,
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except AutomobileVo.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_customerVOs(request):
    if request.method == "GET":
        customerVOs = CustomerVO.objects.all()
        return JsonResponse(
            {"customerVOs": customerVOs},
            encoder=CustomerVOEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customerVO = CustomerVO.objects.create(**content)
            return JsonResponse(
                customerVO,
                encoder=CustomerVOEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "could not be created"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customerVO(request, pk):
    if request.method == "GET":
        try:
            customerVO = CustomerVO.objects.get(id=pk)
            return JsonResponse(
                customerVO,
                encoder=CustomerVOEncoder,
                safe=False
            )
        except CustomerVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customerVO = CustomerVO.objects.get(id=pk)
            customerVO.delete()
            return JsonResponse(
                customerVO,
                encoder=CustomerVOEncoder,
                safe=False,
            )
        except CustomerVO.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customerVO = CustomerVO.objects.get(id=pk)

            properties = ["name", "address", "phone"]
            for property in properties:
                if property in content:
                    setattr(customerVO, property, content[property])
            customerVO.save()
            return JsonResponse(
                customerVO,
                encoder=CustomerVOEncoder,
                safe=False,
            )
        except CustomerVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            properties = ["name", "address", "phone"]
            for property in properties:
                if property in content:
                    setattr(customer, property, content[property])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["PUT", "DELETE", "GET"])
def api_show_technician(request, employee_number):
    if request.method == "PUT":
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(employee_number=employee_number)
            properties = ["name", "employee_number"]
            for property in properties:
                if property in content:
                    setattr(technician, property, content[property])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response 
    elif request.method == "GET":
        try:
            technician = Technician.objects.get(employee_number=employee_number)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response 
    else:
        try:
            technician = Technician.objects.filter(employee_number=employee_number)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response 


@require_http_methods(["GET", "POST"])
def api_list_service_appointment(request):
    try:
        if request.method == "GET":
            services = ServiceAppointment.objects.all()
            return JsonResponse(
                {"services": services},
                encoder=ServiceAppointmentEncoder,
            )
    except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            print("content befoer", content)
            automobile_vin = content["automobile_vin"]
            automobile = AutomobileVo.objects.get(vin=automobile_vin)
            content["automobile"] = automobile
            technician_employee_number = content["technician_employee_number"]
            technician = Technician.objects.get(employee_number=technician_employee_number)
            content["technician"] = technician
            customer_id = content["customer_id"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
            del content["automobile_vin"]
            del content["technician_employee_number"]
            del content["customer_id"]
            print("this is the content ", content)
            service = ServiceAppointment.objects.create(**content)
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "hello"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_service_appointment(request, pk):
    if request.method == "GET":
        try:
            service = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "service appointment does not exist"})
            response.status_code = 404
            return response
        
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            if content.get("automobile_vin") != None:
                automobile_vin = content["automobile_vin"]
                automobile = AutomobileVo.objects.get(vin=automobile_vin)
                content["automobile"] = automobile
                del content["automobile_vin"]
            if content.get("technician_employee_number") != None:
                technician_employee_number = content["technician_employee_number"]
                technician = Technician.objects.get(employee_number=technician_employee_number)
                content["technician"] = technician
                del content["technician_employee_number"]
            if content.get("customer_id") != None:
                customer_id = content["customer_id"]
                customer = Customer.objects.get(id=customer_id)
                content["customer"] = customer
                del content["customer_id"]

            ServiceAppointment.objects.filter(id=pk).update(**content)
            service = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "could not update service appointment"})
            response.status_code = 404
            return response
    else:
        try:
            service_appointment = ServiceAppointment.objects.get(id=pk)
            service_appointment.delete()
            return JsonResponse(
                service_appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "does not exist"})
            