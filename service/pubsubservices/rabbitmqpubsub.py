import pika
from pika.exceptions import AMQPConnectionError
import json
import time
import django
import os
import sys

print("made it 2")
sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import TechnicianVO

def update_or_create_technician(technician):
    print("in update 2")

    # hourly_rate = technician["hourly_rate"]
    # name = technician["name"]
    # employee_number = technician["employee_number"]
    # worked_hours = technician["worked_hours"]
    # commission = technician["commission"]
    TechnicianVO.objects.update_or_create(
        employee_number = technician["employee_number"],
        defaults = {
            "name": technician["name"],
            "hourly_rate": technician["hourly_rate"],
            "worked_hours": technician["worked_hours"],
        },
    )
print("this is rabbitmq 2")
x = True
while x:
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host="rabbitmq")
        )
        channel = connection.channel()
        channel.exchange_declare(exchange="technician", exchange_type="fanout")
        result = channel.queue_declare(queue="", exclusive=True)
        queue_name = result.method.queue
        channel.queue_bind(exchange="technician", queue=queue_name)
        print(" [*] Waiting for logs 2")
        def callback(ch, method, properties, body):
            print(" [x] %r" %body)
            content = json.loads(body)
            update_or_create_technician(content)

        channel.basic_consume(
            queue=queue_name,
            on_message_callback=callback,
            auto_ack=True
        )
        channel.start_consuming()
    except AMQPConnectionError:
        print("Could not connect to RabbitMQ 2")
        time.sleep(2.0)
