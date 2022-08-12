import pika
from pika.exceptions import AMQPConnectionError
import json
import time
import django
import os
import sys

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "finances_project.settings")
django.setup()

from finances_rest.models import EmployeeVO

def update_or_create_employee(employee):
    print("in finances update")
    EmployeeVO.objects.update_or_create(
        employee_number = employee["employee_number"],
        defaults = {
            "commission": employee.get("commission"),
            "name": employee["name"],
            "hourly_rate": employee["hourly_rate"],
            "worked_hours": employee["worked_hours"]
        },
    )

x = True
while x:
    try:
        # connection for technician
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host="rabbitmq")
        )
        channel = connection.channel()
        channel.exchange_declare(exchange="technician", exchange_type="fanout")
        channel.exchange_declare(exchange="salesperson", exchange_type="fanout")
        result_tech = channel.queue_declare(queue="", exclusive=True)
        result_sales_person = channel.queue_declare(queue="", exclusive=True)
        queue_name_sales_person = result_sales_person.method.queue
        queue_name_tech = result_tech.method.queue
        channel.queue_bind(exchange="technician", queue=queue_name_tech)
        channel.queue_bind(exchange="salesperson", queue=queue_name_sales_person)
        

        

        print("[*] Waiting for logs employees")
        
        def callback(ch, method, properties, body):
            print(" [x] %r" %body)
            content = json.loads(body)
            update_or_create_employee(content)

        channel.basic_consume(
            queue=queue_name_tech,
            on_message_callback=callback,
            auto_ack=True
        )

        channel.basic_consume(
            queue=queue_name_sales_person,
            on_message_callback=callback,
            auto_ack=True
        )
        channel.start_consuming()
        # channel_sales_person.start_consuming()
    except AMQPConnectionError:
        print("Could not connect to RabbitMQ: Finances")
        time.sleep(2.0)