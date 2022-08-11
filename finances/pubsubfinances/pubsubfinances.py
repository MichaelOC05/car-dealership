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
            "commission": employee["commission"],
            "name": employee["name"],
            "hourly_rate": employee["hourly_rate"],
            "worked_hours": employee["worked_hours"]
        },
    )

x = True
while x:
    try:
        # connection for technician
        connection_tech = pika.BlockingConnection(
            pika.ConnectionParameters(host="rabbitmq")
        )
        channel_tech = connection_tech.channel()
        channel_tech.exchange_declare(exchange="technician", exchange_type="fanout")
        result_tech = channel_tech.queue_declare(queue="", exclusive=True)
        queue_name_tech = result_tech.method.queue
        channel_tech.queue_bind(exchange="technician", queue=queue_name_tech)
        
        # connection for salesperson
        connection_sales_person = pika.BlockingConnection(
            pika.ConnectionParameters(host="rabbitmq")
        )
        channel_sales_person = connection_sales_person.channel()
        channel_sales_person.exchange_declare(exchange="salesperson", exchange_type="fanout")
        result_sales_person = channel_sales_person.queue_declare(queue="", exclusive=True)
        queue_name_sales_person = result_sales_person.method.queue
        channel_sales_person.queue_bind(exchange="salesperson", queue=queue_name_sales_person)

        print("[*] Waiting for logs employees")
        
        def callback(ch, method, properties, body):
            print(" [x] %r" %body)
            content = json.loads(body)
            update_or_create_employee(content)

        channel_tech.basic_consume(
            queue=queue_name_tech,
            on_message_callback=callback,
            auto_ack=True
        )

        channel_sales_person.basic_consume(
            queue=queue_name_sales_person,
            on_message_callback=callback,
            auto_ack=True
        )
        channel_sales_person.start_consuming()
        channel_tech.start_consuming()
    except AMQPConnectionError:
        print("Could not connect to RabbitMQ: Finances")
        time.sleep(2.0)