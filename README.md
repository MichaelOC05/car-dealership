# CarCar

Team:

Tim Lotz: Sales
Michael O'Connell: service

## Design

    We have included a Domain Driven Design map image in the design directory.

    - React Components:
        - update Nav bar
        - add routes to App

## Inventory
    - Models:
        - Change the Automobile model to include a property for sold

    - React Components:
        - createManufacturerForm
        - listManufacturers
        - createVehicleModelForm
        - listVehicleModels
        - createAutomobileForm
        - listAutomobiles

## Service microservice

    - Models:
        - AutomobileVO
            - vin
            - sold
        - Technician
            - name
            - employee number
        - ServiceAppointment (Aggregate Root)
            - automobile
            - technician
            - customer
        - Customer
            - name
            - address
            - phone number

    - React Components:
        - createTechnicianForm
        - createServiceAppointment
        - listAppointments
        - listServiceHistory

## Sales microservice

    -Models:
        - AutomobileVO
            - vin
            - sold
        - Customer
            - name
            - address
            - phone number
        - Sale (Aggregate Root)
            - automobile
            - sales person
            - customer
            - price
        - SalesPerson
            - name
            - employee number

    - React Components:
        - createSalesPerson
        - createPotentialCustomer
        - createSalesRecord
        - listSales
        - listSalesPersons