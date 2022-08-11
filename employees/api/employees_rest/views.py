from urllib import response
from django.shortcuts import render
from .models import SalesPerson, Technician
import pika
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json
# Create your views here.

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["id", "employee_number", "hourly_rate", "name", "worked_hours", "commission"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["hourly_rate", "name", "employee_number", "worked_hours"]

def send_sales_person_data(sales_person):
    print("sales", sales_person)
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host="rabbitmq")
    )
    channel = connection.channel()
    channel.exchange_declare(exchange="salesperson", exchange_type="fanout")
    channel.basic_publish(exchange="salesperson", routing_key="", body=sales_person)
    print(" [x] %r" %sales_person)
    connection.close()


def send_technician_data(technician):
    print("technician", technician)
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host="rabbitmq")
    )
    channel = connection.channel()
    channel.exchange_declare(exchange="technician", exchange_type="fanout")
    channel.basic_publish(exchange="technician", routing_key="", body=technician)
    print(" [x] %r" %technician)
    connection.close()


@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder
        )
    else:
        try:
            print(request.body)
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            print(sales_person)
            
            # sales_person = json.dumps(sales_person)
            

            send_sales_person_data(request.body)
            return JsonResponse(
                {"sales_person": sales_person},
                encoder=SalesPersonEncoder
            )
        except:
            response = JsonResponse(
                {"message": "something went wrong"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            send_technician_data(request.body)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianEncoder
            )
        except:
            response = JsonResponse(
                {"message": "something went wrong"}
            )
            response.status_code = 400
            return response