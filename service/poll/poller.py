import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import AutomobileVo, CustomerVO


def get_customer():
    print("here")
    response = requests.get("http://customer-api:8000/api/customers/")
    content = json.loads(response.content)
    for customer in content["customers"]:
        CustomerVO.objects.update_or_create(
            id = customer["id"],
            defaults = {
                "name": customer["name"],
                "address": customer["address"],
                "phone": customer["phone"],
            }
        )


def get_automobile():
    print("here")
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for auto in content["autos"]:
        if auto["sold"] == True and auto not in AutomobileVo.objects.all():
            AutomobileVo.objects.update_or_create(
                vin = auto["vin"],
                defaults = {
                    "sold": True,
                    "color": auto["color"],
                    "year": auto["year"],
                    "model_name": auto["model"]["name"],
                    "model_manufacturer": auto["model"]["manufacturer"]["name"]
                }
            )



def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            get_automobile()
            get_customer()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(6)


if __name__ == "__main__":
    poll()
