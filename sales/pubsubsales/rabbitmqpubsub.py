import pika 
from pika.exceptions import AMQPConnectionError
import json
import time
import django
import os
import sys

print("made it")
sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import SalesPersonVO


def update_create_salesperson(salesperson):
    print("in update")

    hourly_rate = salesperson["hourly_rate"]
    name = salesperson["name"]
    employee_number = salesperson["employee_number"]
    worked_hours = salesperson["worked_hours"]
    commission = salesperson["commission"]
    SalesPersonVO.objects.update_or_create(
        employee_number=employee_number,
        defaults={
            "hourly_rate": hourly_rate,
            "name": name,
            "worked_hours": worked_hours,
            "commission": commission,
        },
    )
print("this is rabbitmq")
x = True
while x:
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host="rabbitmq")
        )
        channel = connection.channel()
        channel.exchange_declare(exchange="salesperson", exchange_type="fanout")
        result = channel.queue_declare(queue="", exclusive=True)
        queue_name = result.method.queue
        channel.queue_bind(exchange="salesperson", queue=queue_name)
        print(" [*] Waiting for logs.")
        def callback(ch, method, properties, body):
            print(" [x] %r" %body)
            content = json.loads(body)
            update_create_salesperson(content)

        channel.basic_consume(
            queue=queue_name,
            on_message_callback=callback,
            auto_ack=True
        )
        channel.start_consuming()
    except AMQPConnectionError:
        print("Could not connect to RabbitMQ")
        time.sleep(2.0)
        