# CarCar

    Team:
        - Michael O'Connell: Services Microservice
        - Tim Lotz: Sales Microservice


## Design

    We have included a Domain Driven Design map image in the design directory.
    In the following sections we will display the models for the service in the section title followed by the React components for that service.

## Main App

    - React Components:
        - in MainPage.js displayed the home page
        - in App.js added routes for every React component
        - in Nav.js updated the Nav bar to include Nav Links to every react component
        - in index.js loaded the following props from the apis to App.js
            - automobiles
            - manufacturers
            - vehicleModels
            - sales
            - salesPersons
            - salesAutomobiles
            - salesCustomers

## Inventory
    - Models:
        - Automobile:
            - color (CharField)
            - year (PositiveSmallIntegerField)
            - vin (CharField)
            - sold (BooleanField) (added this)
            - model (ForeignKey to VehicleModel model)
        - Manufacturer:
            - name (CharField)
        - VehicleModel:
            - name (CharField)
            - picture_url (URLField)
            - manufacturer (ForeignKey to Manufacturer model)

    - React Components:
        - created a form component for a new manufacturer in CreateManufacturer.js
        - created a list of manufacturers in ListManufacturers.js
        - created a form component for a new vehicle model in CreateVehicleModelForm.js
        - created a list of vehicle models in ListVehicleModels.js
        - created a form component for a new automobile in CreateAutomobileForm.js
        - created a list of automobiles in ListAutomobiles.js

## Service microservice

    - Models:
        - ServiceAppointment: (Aggregate Root)
            - automobile (ForeignKey to AutomobileVO model)
            - technician (ForeignKey to Technician model)
            - customer (ForeignKey to Customer model)
            - reason (TextField)
            - date_time (DateTimeField)
            - completed (BooleanField)
        - AutomobileVO: (Value Object of the Inventory Automobile model)
            - vin (CharField)
            - sold (BooleanField)
        - Customer:
            - name (CharField)
            - address (CharField)
            - phone_number (IntegerField) 
        - Technician:
            - name (CharField)
            - employee number (IntegerField)

    - React Components:
        - created form component for a new technician in CreateTechnician.js
        - created form component for a new service appointment in CreateServiceAppointment.js
        - created form component for a new customer in CreateServiceCustomer.js
        - created a list of service appointments in ListServices.js
        - created a list of service appointments filtered by vin number in AutomobileServiceHistory.js

## Sales microservice

    -Models:
        - Sale: (Aggregate Root)
            - automobile (ForeignKey to AutomobileVO model)
            - sales_person (ForeignKey to SalesPerson model)
            - customer (ForeignKey to Customer model)
            - price (DecimalField)
        - AutomobileVO: (Value Object of the Inventory Automobile model)
            - vin (CharField)
            - sold (BooleanField)
        - Customer:
            - name (CharField)
            - address (CharField)
            - phone (IntegerField) 
        - SalesPerson:
            - name (CharField)
            - employee_number (IntegerField)

    - React Components:
        - created a form component for a new sales person in CreateSalesPerson.js
        - created a form component for a new customer in CreateSalesCustomer.js
        - created a form component for a new sale in CreateSalesRecord.js
        - created a list of sales records in ListSales.js 
        - created a list of sales records filtered by sales person in ListSalesPersonHistory.js


## APIs

    In the following sections we will display the api paths for the service in the section title followed by their allowed methods and examples of the json requests where relevant.

## Inventory APIs

    - Manufactures:
        - List of Manufacturers: http://localhost:8090/api/sales/automobiles/
            - GET method:
                    {
                        "manufacturers": [
                            {
                                "href": "/api/manufacturers/<id>/",
                                "id": 1,
                                "name": "<Sample Name>"
                            },
                            {
                                "href": "/api/manufacturers/2/",
                                "id": 2,
                                "name": "<Sample Name>"
                            }
                        ]
                    }
            - POST method:
                    {
                        "name": "<Sample Name>"
                    }
        - Details of a Manufacturer: http://localhost:8100/api/manufacturers/<id>/
            - GET method:
                    {
                        "href": "/api/manufacturers/1/",
                        "id": 1,
                        "name": "<Sample Name>"
                    }
            - PUT method: 
                    {
                        "name": "Chrysler"
                    }
            - DELETE method:
                    {
                        "id": null,
                        "name" <Sample Deleted Name>
                    }

    - Vehicle Models:
        - List of Vehicle Models: http://localhost:8100/api/models/
            - GET method: 
                    {
                        "models": [
                            {
                                "href": "/api/models/1/",
                                "id": 1,
                                "name": "<Sample Name>,
                                "picture_url": "http://samplepicture.com/picture.jpeg",
                                "manufacturer": {
                                    "href": "/api/manufacturers/1/",
                                    "id": 1,
                                    "name": "<Sample Manufacturer>
                                }
                            }
                            {
                                "href": "/api/models/2/",
                                "id": 2,
                                "name": "<Sample Name>,
                                "picture_url": "http://samplepicture.com/picture.jpeg",
                                "manufacturer": {
                                    "href": "/api/manufacturers/1/",
                                    "id": 1,
                                    "name": "<Sample Manufacturer>
                                }
                            }
                        ]
                    }
            - POST method:
                    - {
                        "name": "<Sample Name>",
                        "picture_url": "http://samplepicture.com/picture.jpeg",
                        "manufacturer_id": 1
                    }
        - Details of a Vehicle Model: "http://localhost:8100/api/models/2/"
            - GET method: 
                    {
                        "href": "/api/models/1/",
                        "id": 1,
                        "name": "<Sample Name>,
                        "picture_url": "http://samplepicture.com/picture.jpeg",
                        "manufacturer": {
                            "href": "/api/manufacturers/1/",
                            "id": 1,
                            "name": "<Sample Manufacturer>
                        }
                    }
            - PUT method: 
                    {
                        "name": "<Sample Name>",
                        "picture_url": "http://samplepicture.com/picture.jpeg",
                        "manufacturer_id": 1
                    }
            - DELETE method:
                    {
                        "id": null,
                        "name": "<Sample Deleted Name>,
                        "picture_url": "http://samplepicture.com/picture.jpeg",
                        "manufacturer": {
                            "href": "/api/manufacturers/1/",
                            "id": 1,
                            "name": "<Sample Manufacturer>
                        }
                    }
    
    - Automobiles: 
        - List of Automobiles: http://localhost:8100/api/automobiles/
            - GET method:
                    {
                        "autos": [
                            {
                                "href": "/api/automobiles/<VIN Number>/",
                                "id": 1,
                                "color": "red",
                                "year": 2005,
                                "vin": "<Sample VIN Number>,
                                "model": {
                                    "href": "/api/models/1/",
                                    "id": 1,
                                    "name": "<Sample Name>,
                                    "picture_url": "http://samplepicture.com/picture.jpeg",
                                    "manufacturer": {
                                        "href": "/api/manufacturers/1/",
                                        "id": 1,
                                        "name": "<Sample Manufacturer>
                                    }
                                },
                                "sold": false
                            },
                            {
                                "href": "/api/automobiles/<VIN Number>/",
                                "id": 2,
                                "color": "red",
                                "year": 2005,
                                "vin": "<Sample VIN Number>,
                                "model": {
                                    "href": "/api/models/1/",
                                    "id": 1,
                                    "name": "<Sample Name>,
                                    "picture_url": "http://samplepicture.com/picture.jpeg",
                                    "manufacturer": {
                                        "href": "/api/manufacturers/1/",
                                        "id": 1,
                                        "name": "<Sample Manufacturer>
                                    }
                                },
                                "sold": false
                            },
                        ]
                    }
            - POST method: 
                    {
                        "color": "red",
                        "year": 2012,
                        "vin": "1",
                        "model_id": 1,
                        "sold": true
                    }
        - Details of an Automobile: http://localhost:8100/api/automobiles/<VIN Number>/
            - GET method:
                    {
                        "href": "/api/automobiles/<VIN Number>/",
                        "id": 2,
                        "color": "red",
                        "year": 2005,
                        "vin": "<Sample VIN Number>,
                        "model": {
                            "href": "/api/models/1/",
                            "id": 1,
                            "name": "<Sample Name>,
                            "picture_url": "http://samplepicture.com/picture.jpeg",
                            "manufacturer": {
                                "href": "/api/manufacturers/1/",
                                "id": 1,
                                "name": "<Sample Manufacturer>
                            }
                        },
                        "sold": false
                    }
            - PUT method:
                    {
                        "color": "red",
                        "year": 2005,
                        "sold": true
                    }
            - DELETE method:
                    {
                        "href": "/api/automobiles/<VIN Number>/",
                        "id": null,
                        "color": "red",
                        "year": 2005,
                        "vin": "<Sample VIN Number>,
                        "model": {
                            "href": "/api/models/1/",
                            "id": 1,
                            "name": "<Sample Name>,
                            "picture_url": "http://samplepicture.com/picture.jpeg",
                            "manufacturer": {
                                "href": "/api/manufacturers/1/",
                                "id": 1,
                                "name": "<Sample Manufacturer>
                            }
                        },
                        "sold": false
                    }

## Service APIs

    - Technician: 
        - List of Technicians: http://localhost:8080/api/services/technicians/
            - GET method: 
                    {
                        "technicians": [
                            {
                                "name": "<Sample Name>",
                                "employee_number": 1
                            },
                            {
                                "name": "<Sample Name>",
                                "employee_number": 2
                            },
                        ]
                    }
            - POST method: 
                    {
                        "name": "<Sample Name>",
                        "employee_number": 1
                    }
        - Details of a Technician: host:8080/api/services/technicians/<employee_number>/
            - GET method:
                    {
                        "name": "<Sample Name>",
                        "employee_number": <employee_number>
                    }
            - PUT method: 
                    {
                        "name": "<Sample Name>",
                        "employee_number": 1
                    }
            - DELETE method:
                    []

    - Customers:
        - List of Customers:
            - GET method:
                    {
                        "customers": [
                            {
                                "id": 1,
                                "name": "<Sample Name",
                                "address": "<Sample Address>",
                                "phone_number": <Sample Phone Number>
                            },
                            {
                                "id": 2,
                                "name": "<Sample Name",
                                "address": "<Sample Address>",
                                "phone_number": <Sample Phone Number>
                            },
                        ]
                    }
            - POST method:
                    {
                        "id": 1,
                        "name": "<Sample Name",
                        "address": "<Sample Address>",
                        "phone_number": <Sample Phone Number>
                    }
        - Details of a Customer: http://localhost:8080/api/services/customers/<id>/
            - GET method:
                    {
                        "id": 1,
                        "name": "<Sample Name",
                        "address": "<Sample Address>",
                        "phone_number": <Sample Phone Number>
                    }
            - PUT method: 
                    {
                        "id": 1,
                        "name": "<Sample Name",
                        "address": "<Sample Address>",
                        "phone_number": <Sample Phone Number>
                    }
            - DELETE method:
                    {
                        "id": null,
                        "name": "<Sample Name",
                        "address": "<Sample Address>",
                        "phone_number": <Sample Phone Number>
                    }

    - AutomobileVOs:
        - List of AutomobileVOs: http://localhost:8080/api/services/automobiles/
            - GET method:
                    {
                        "automobileVOs": [
                            {
                                "vin": "<Sample VIN>",
                                "sold": true
                            },
                            {
                                "vin": "<Sample VIN>",
                                "sold": true
                            }
                        ]
                    }
            - POST method: 
                    {
                        "vin": "<Sample VIN>"
                    }
        -Details of an AutomobileVO: http://localhost:8080/api/services/automobiles/<Sample VIN>/
            - GET method:
                    {
                        "vin": "<Sample VIN>",
                        "sold": true
                    }
            - DELETE method: (Note only works if the Automobile is not in Inventory)

    - Services:
        - List Service Appointments: http://localhost:8080/api/services/appointments/
            - GET method:  
                    {
                        "services": [
                            {
                                "id": 1,
                                "customer": {
                                    "id": 2,
                                    "name": "<Sample Customer Name>",
                                    "address": "<Sample Address>",
                                    "phone_number": <Sample Phone Number>
                                },
                                "technician": {
                                    "name": "<Sample Technician Name>",
                                    "employee_number": 4
                                },
                                "automobile": {
                                    "vin": "<Sample VIN>",
                                    "sold": true
                                },
                                "reason": "tires",
                                "date_time": "yyyy-mm-ddThh:mm:ss+00:00",
                                "completed": false
                            },
                            {
                                "id": 2,
                                "customer": {
                                    "id": 2,
                                    "name": "<Sample Customer Name>",
                                    "address": "<Sample Address>",
                                    "phone_number": <Sample Phone Number>
                                },
                                "technician": {
                                    "name": "<Sample Technician Name>",
                                    "employee_number": 4
                                },
                                "automobile": {
                                    "vin": "<Sample VIN>",
                                    "sold": true
                                },
                                "reason": "check engine light",
                                "date_time": "yyyy-mm-ddThh:mm:ss+00:00",
                                "completed": false
                            }
                        ]
                    }
            - POST method:
                    {
                        "automobile_vin": "<Sample VIN>",
                        "technician_employee_number": 4,
                        "customer_id": 2,
                        "reason": "check engine light",
                        "date_time": "yyyy-mm-dd hh:mm:ss"
                    }
        - Details of a Service Appointment
            - GET method:
                    {
                        "id": 1,
                        "customer": {
                            "id": 2,
                            "name": "<Sample Name>",
                            "address": "<Sample Address>",
                            "phone_number": <Sample Phone Number>
                        },
                        "technician": {
                            "name": "<Sample Technician Name>",
                            "employee_number": 4
                        },
                        "automobile": {
                            "vin": "<Sample Vin>",
                            "sold": true
                        },
                        "reason": "tires",
                        "date_time": "yyyy-mm-ddThh:mm:ss+00:00",
                        "completed": false
                    }
            - PUT method: 
                    {
                        "technician_employee_number": 4,
                        "customer_id": 2,
                        "reason": "check engine light",
                        "date_time": "yyyy-mm-dd hh:mm:ss"
                    }
            - DELETE method:
                    {
                        "id": null,
                        "customer": {
                            "id": 2,
                            "name": "<Sample Name>",
                            "address": "<Sample Address>",
                            "phone_number": <Sample Phone Number>
                        },
                        "technician": {
                            "name": "<Sample Technician Name>",
                            "employee_number": 4
                        },
                        "automobile": {
                            "vin": "<Sample Vin>",
                            "sold": true
                        },
                        "reason": "tires",
                        "date_time": "yyyy-mm-ddThh:mm:ss+00:00",
                        "completed": false
                    }
            
## Sales APIs

    - Sales Persons:
        - List Sales Persons: http://localhost:8090/api/sales/sales_person/
            - GET method:
                    {
                        "sales_persons": [
                            {
                                "employee_number": 1,
                                "name": "<Sample Name>"
                            },
                            {
                                "employee_number": 2,
                                "name": "<Sample Name>"
                            },
                        ]
                    }
            - POST method:
                    {
                        "employee_number": 2,
                        "name": "<Sample Name>"
                    }
        - Details of a Sales Person: http://localhost:8090/api/sales/sales_person/<id>/
            - GET method:
                    {
                        "employee_number": <id>,
                        "name": "<Sample Name>"
                    }
            - PUT method:
                    {
                        "employee_number": <id>,
                        "name": "<Sample Name>"
                    }
            - DELETE method:
                    {
                        "employee_number": <id>,
                        "name": "<Sample Name>"
                    }

    - Customers:
        - List Customers: http://localhost:8090/api/sales/customers/
            - GET method: 
                    {
                        "customers": [
                            {
                                "id": 1,
                                "name": "<Sample Name>",
                                "address": "<Sample Address>",
                                "phone": <Sample Phone Number>
                            },
                            {
                                "id": 2,
                                "name": "<Sample Name>",
                                "address": "<Sample Address>",
                                "phone": <Sample Phone Number>
                            }
                        ]
                    }
            - POST method:
                    {
                        "name": "<Sample Name>",
                        "address": "<Sample Address>",
                        "phone": <Sample Phone Number>
                    }
        - Details of a Customer: http://localhost:8090/api/sales/customers/<id>/
            - GET method:
                    {
                        "id": <id>,
                        "name": "<Sample Name>",
                        "address": "<Sample Address>",
                        "phone": <Sample Phone Number>
                    }
            - PUT method:
                    {
                        "name": "<Sample Name>",
                        "address": "<Sample Address>",
                        "phone": <Sample Phone Number>
                    }
            - DELETE method:
                    {
                        "id": null,
                        "name": "<Sample Name>",
                        "address": "<Sample Address>",
                        "phone": <Sample Phone Number>
                    }

    - AutomobileVOs:
        - List AutomobileVOs: http://localhost:8090/api/sales/automobiles/
            - GET method:
                    {
                        "automobileVOs": [
                            {
                                "vin": "<Sample VIN>",
                                "sold": false
                            },
                            {
                                "vin": "<Sample VIN>",
                                "sold": true
                            }
                        ]
                    }
        - Details of an AutomobileVO: http://localhost:8090/api/sales/automobiles/<VIN>/
            - GET method:
                    {
                        "vin": "<Sample VIN>",
                        "sold": true
                    }  

    - Sales:
        - List Sales: http://localhost:8090/api/sales/
            - GET method:
                    {
                        "sales": [
                            {
                                "id": 1,
                                "automobile": {
                                    "vin": "<Sample VIN>",
                                    "sold": true
                                },
                                "sales_person": {
                                    "employee_number": 1,
                                    "name": "<Sample Name>"
                                },
                                "customer": {
                                    "id": 1,
                                    "name": "<Sample Name>",
                                    "address": "<Sample Address>",
                                    "phone": <Sample Phone Number>
                                },
                                "price": 9999.99
                            },
                            {
                                "id": 2,
                                "automobile": {
                                    "vin": "<Sample VIN>",
                                    "sold": true
                                },
                                "sales_person": {
                                    "employee_number": 1,
                                    "name": "<Sample Name>"
                                },
                                "customer": {
                                    "id": 1,
                                    "name": "<Sample Name>",
                                    "address": "<Sample Address>",
                                    "phone": <Sample Phone Number>
                                },
                                "price": 9999.99
                            }
                        ]
                    } 
            - POST method:
                    {
                        "price": "9999.99",
                        "automobile_vin": "<Sample VIN>",
                        "sales_person_employee_number": 1,
                        "customer_id": 1
                    }
        - Details of a Sale: http://localhost:8090/api/sales/<id>/
            - GET method:
                    {
                        "id": <id>,
                        "automobile": {
                            "vin": "<Sample VIN>",
                            "sold": true
                        },
                        "sales_person": {
                            "employee_number": 1,
                            "name": "<Sample Name>"
                        },
                        "customer": {
                            "id": 1,
                            "name": "<Sample Name>",
                            "address": "<Sample Address>",
                            "phone": <Sample Phone Number>
                        },
                        "price": 9999.99
                    }
            - DELETE method:
                    {
                        "id": null,
                        "automobile": {
                            "vin": "<Sample VIN>",
                            "sold": true
                        },
                        "sales_person": {
                            "employee_number": 1,
                            "name": "<Sample Name>"
                        },
                        "customer": {
                            "id": 1,
                            "name": "<Sample Name>",
                            "address": "<Sample Address>",
                            "phone": <Sample Phone Number>
                        },
                        "price": 9999.99
                    },
    

## Notes:

    - The automobileVOs for the services microservice are only created for instances of Inventory Automobiles where the sold property is true. We have also allowed creation of AutomobileVOS to account for preforming services on automobiles we have not sold. Because of this, we considered the fringe case where an automobile we have worked on and is in AutomobileVOs gets purchased by us and added to Inventory Automobiles. This should not cause any problems because the poller uses an update_or_create() function and will update the version of the car in AutomobileVOs to match the version of the same car we add to Inventory on purchase.
    This was done in order to showcase difference between VIP treatment and non-VIP treatment
    No form page was made so creation must be done through a third-party source such as insomnia (the url can be found in view in service_rest)


## Stretch Goals:

    -
