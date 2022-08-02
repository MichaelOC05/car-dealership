import http
import re
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from sales_rest.models import Customer, Sale, SalesPerson, AutomobileVO
# Create your views here.

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "name", "address", "phone"]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["employee_number", "name"]
    # encoders = {"sales": SalesEncoder}


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "sales_person", "customer", "price"]
    encoders = {"automobile": AutomobileVOEncoder(), "sales_person": SalesPersonEncoder(), "customer": CustomerEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_automobileVOs(request):
    if request.method == "GET":
        automobileVOs = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobileVOs": automobileVOs},
            encoder=AutomobileVOEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            automobileVO = AutomobileVO.objects.create(**content)
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


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_automobileVO(request, vin):
    if request.method == "GET":
        try:
            auto = AutomobileVO.objects.get(vin=vin)
            return JsonResponse(
                auto,
                encoder=AutomobileVOEncoder,
                safe=False
            )
        except AutomobileVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            auto = AutomobileVO.objects.get(vin=vin)
            auto.delete()
            return JsonResponse(
                auto,
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            auto = AutomobileVO.objects.get(vin=vin)

            properties = ["sold"]
            for property in properties:
                if property in content:
                    setattr(auto, property, content[property])
            auto.save()
            return JsonResponse(
                auto,
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
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
def api_list_sales_persons(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_person},
            encoder=SalesPersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the automobileVO"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_sales_person(request, employee_number):
    if request.method == "GET":
        try:
            person = SalesPerson.objects.get(employee_number=employee_number)
            # sales = Sale.objects.filter(sales_person=person)
            return JsonResponse(
                # {"sales_person": person, "sales": sales},
                person,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            person = SalesPerson.objects.get(employee_number=employee_number)
            person.delete()
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            person = SalesPerson.objects.get(employee_number=employee_number)

            properties = ["name", "employee_number"]
            for property in properties:
                if property in content:
                    setattr(person, property, content[property])
            person.save()
            return JsonResponse(
                person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)

            # might need to delete content["automobile_vin"] before posting
            automobile_vin = content["automobile_vin"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile

            # same with content["sales_person_employee_number"]
            sales_person_employee_number = content["sales_person_employee_number"]
            sales_person = SalesPerson.objects.get(employee_number=sales_person_employee_number)
            content["sales_person"] = sales_person

            customer_id = content["customer_id"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer

            del content["automobile_vin"]
            del content["sales_person_employee_number"]
            del content["customer_id"]

            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the automobile"}
            )
            response.status_code = 400
            return response
