# CarCar

    Team:
        - Michael O'Connell: Services Microservice
        - Tim Lotz: Sales Microservice

## Design

    We have included a Domain Driven Design map image in the design directory.
    In the following sections we will discuss how to install the app, display the models for the service in the section title followed by the React components for that service, and list the apis and methods allowed for each api path.


## Documentation for Non-Technical Users:

    Once the application folder has been downloaded to your computer please make sure that you have Docker Desktop installed and open on your computer. If you do not have docker desktop you can find the installation link here: https://www.docker.com/products/docker-desktop/. 

    Once Docker Desktop has been opened in your terminal go to the topmost directory for the application. Once there run the following commands:
            docker volume create beta-data
            docker-compose build
            docker-compose up

    When you run docker-compose up and if you’re on macOS, you will see a warning about an environment variable named os being missing. You can safely ignore this.

    At this point check your Docker Desktop application, select the Containers tab on the left side of the application. On the Containers page you should see a container named project-beta. When the play button on the right-hand side becomes a pause button your application is running. 

    To access the React front-end go to http://localhost:3000/ in your browser. note: if you are running Windows React may take a few minutes to load. If you see the CarCar main page feel free to browse the application.

## In order to use the application:

    note: there is an order to the creation of instances, it must be followed in order for instances of another model to be created. For instance in order to create a Vehicle Model (such as Ford Escape) the manufacturer (Ford) must be created in the database first. The following instructions will walk you through the proper order to follow. It is advised to create these in the shown order when necessary.


## Inventory:

    Steps in Order to Create a Manufacturer:
    - Select Inventory from the home nav bar
    - Select New Manufacturer from the nav bar
    - On the form type in the name of the manufacturer and click the Create button
    - In order to make sure a new manufacturer has been created click on Manufacturers in the nav bar
      If the manufacturer you created is in the table then you were successful


    Steps in Order to Create a Vehicle Model:
    - Select Inventory from the home nav bar
    - Select New Model from the nav bar
    - In the form type in the name of the Model in the name section
    - If you would like to include a picture for the model paste a picture url in the picture url input, 
      however this is not necessary a new model may be created without a picture url
    - Next from the drop down box select the name of the manufacturer that is associated with the model
      note: if the manufacturer can not be found follow the “Steps in Order to Create a Manufacturer” above in order to create the manufacturer
    - Click the Create button
    -  In order to make sure a new vehicle model has been created click on Models in the nav bar
       If the vehicle model you created is listed in the table your vehicle model creation has been successful

    Steps in Order to Create an Automobile:
    - Select Inventory from the home nav bar
    - Select New Automobile from the nav bar
    - In the form fill in the color of the automobile, the year it was made, and its VIN
      From the drop down bar select the vehicle model it is
      note: if the automobile’s vehicle model can not be found follow the “Steps in Order to Create a Vehicle Mode” 
      above in order to create a Vehicle Model
    - Click the Create button
    - In order to make sure a new automobile has been created click on Automobiles in the nav bar
      If the automobile you created is listed in the table your automobile creation has been successful


## Service Department:

    note: automobiles in the service department can either be created (in the case of customers with cars from other dealerships) or are polled from the Inventory Microservice when a car has been sold

    Steps in Order to Create a New Service Customer:
    - Select Service Department from the home nav bar
    - Select New Service Customer from the nav bar
    - In the form fill in the name, address, and phone number of the customer
    - Click the Create button

    Steps in Order to Create a New Technician:
    - Select Service Department from the home nav bar
    - Select New Technician from the nav bar
    - In the form fill in the name and employee number for the technician
    - Click the Create button

    Steps in Order to Create a New Automobile Value Object in Service:
    - Select Service Department from the home nav bar
    - Select New Service Automobile from the nav bar
    - In the form fill in the automobile’s vin
    - Click the Create button

    Steps in Order to Create a New Service Customer:
    - Select Service Department from the home nav bar
    - Select New Service Customer in the nav bar
    - In the form fill in the customer’s name, address and phone number
    - Click the Create button

    Steps in Order to Create a New Service Appointment:
    - Select Service Department from the home nav bar
    - Select New Service Appointment from the nav bar
    - From the Technician drop down menu select the technician that will perform the service
      note: if the technician you are looking for can not be found please follow “Steps in Order to Create a New Technician” found above in order to create a new technician
    - From the Customer drop down menu select the customer whose car will be serviced
      note: if the customer you are looking for can not be found please follow “Steps in Order to Create a New Service Customer” found above in order to create a new service customer
    - From the Automobile drop down menu select the automobile that will be serviced
      note: if the automobile you are looking for can not be found please follow “Steps in Order to Create a New Automobile Value Object in Service” above in order to create a new automobile in the Service Department
    - In the Reason text box type in the reason for the service
    - Select the date and time from the calendar
    - Click Create button
      If the service appointment is listed in the Service Appointments page the creation has been successful

    View Upcoming Service Appointments:
    - Select Service Department from the home nav bar
    - Select Service Appointments from the nav bar
      Upcoming service appointments will be listed
    Information included:
      Automobile’s VIN, whether the automobile is VIP (bought at this dealership), customer name, date and time of the appointment, Technician designated  for the service and reason for the service
      note: see next section for information on Finished and Cancel buttons

    Canceling and Marking a Service as Complete:
    - Select Service Department from the home nav bar
    - Select Service Appointments from the nav bar
    To Cancel a Service Appointment:
    - Find the service appointment you are looking for, click the Cancel button
      The page will reload without that service appointment
      note: there will not be a record of canceled appointments
    To Mark a Service Appointment as Finished:
    - Find the service appointment you are looking for, click the Finished button
      The page will reload and the service appointment will no longer be there
      note: the service appointment record will be stored under the vin, see next section 

    View Automobile Service History:
    - Select Service Department from the home nav bar
    - Select Service Appointment History from the nav bar
    - From the drop down menu select the automobile’s VIN you are looking for
    Information included:
    - The VIN will be displayed as the title of the page
    - Whether the automobile is VIP (bought at this dealership), the customer name, date and time of the service appointment, the technician who performed  the service and the reason for the service


## Sales Department:

    note: automobiles in the sales department are polled from the inventory microservice, there is no way to create an automobile in the sales department, in order to do so please follow “Steps in Order to Create an Automobile” in the inventory section above

    Steps in Order to Create a New Sales Customer:
    - Select Sales Department from the home nav bar
    - Select New Sales Customer in the nav bar
    - In the form fill in the customer’s name, address and phone number
    - Click the Create button

    Steps in Order to Create a New Salesperson:
    - Select Sales Department from the home nav bar
    - Select New Salesperson from the nav bar
    - In the form fill in the name and employee number for the salesperson

    Steps in Order to Create a New Sales Record:
    - Select Sales Department from the home nav bar
    - Select New Sale from the nav bar
    - In the form fill in the price
    - From the Sales Person drop down menu select the sales person for the sale
      note: if the sales person you are looking for can not be found please follow “Steps in Order to Create a New Salesperson” above 
    - From the Customer drop down menu select the sales customer that is purchasing the automobile
      note: if the sales customer you are looking for can not be found please follow “Steps in Order to Create a New Sales Customer” above
    - From the Automobile drop down menu select the automobile that is being bought
      note: if the automobile being purchased can not be found please follow “Steps in Order to Create an Automobile” in the inventory section
    - Click the Create button

    View All Past Sales:
    - Select Sales Department from the home nav bar
    - Select Sales List from the nav bar
    Information included:
    - Which sales person made the sale, their employee number, the customer who bought the automobile, the VIN of the automobile, the price the automobile was sold for
      note: if the sale record you are looking for can not be found it may have not been entered, please follow “Steps in Order to Create a New Sales Record” above

    View Sales by a Sales Person:
    - Select Sales Department from the home nav bar
    - Select Sales History from the nav bar
    - From the drop down menu select the the sales person whose history you would like to view
      Once selected the table will display their sales history
    Information included:
    - Sales person name, their employee number, the customer who bought the automobile, the VIN of the automobile and the price the automobile was sold for


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

    The automobileVOs for the services microservice are only created for instances of Inventory Automobiles where the sold property is true. We have also allowed creation of AutomobileVOS to account for preforming services on automobiles we have not sold. Because of this, we considered the fringe case where an automobile we have worked on and is in AutomobileVOs gets purchased by us and added to Inventory Automobiles. This should not cause any problems because the poller uses an update_or_create() function and will update the version of the car in AutomobileVOs to match the version of the same car we add to Inventory on purchase.
    This was done in order to showcase difference between VIP treatment and non-VIP treatment
    No form page was made for service automobileVO so creation must be done through a third-party source such as insomnia (the url can be found in the api section above service_rest)


## Stretch Goals:

    x create multiple nav bars for the different micro-services
    - option on drop down to create new instance
    - give alert if unique property match on browser
    - phone number as tel input field and text rather than integer in the model
    - react index file put all promises in one array
    x remove errors on create sales record
    - service poll more information about the automobile such as color, make, model, etc. (do the same for sales automobile prop)
    - create bash file to run opening start commands on run
