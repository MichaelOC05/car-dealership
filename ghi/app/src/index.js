import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadProps() {
  const responseAutomobiles = await fetch('http://localhost:8100/api/automobiles/')
  const responseSalesAutomobiles = await fetch('http://localhost:8090/api/sales/automobiles/')
  const responseSalesCustomers = await fetch('http://localhost:8090/api/sales/customers/')
  const responseManufacturers = await fetch('http://localhost:8100/api/manufacturers/')
  const responseVehicleModels = await fetch('http://localhost:8100/api/models/')
  const responseSales = await fetch('http://localhost:8090/api/sales/')
  const responseSalesPersons = await fetch('http://localhost:8090/api/sales/sales_person/')
  if (responseAutomobiles.ok && responseManufacturers.ok && responseVehicleModels.ok && responseSales.ok && responseSalesPersons.ok && responseSalesCustomers.ok && responseSalesAutomobiles.ok) {
    const dataAutomobiles = await responseAutomobiles.json()
    const dataManufacturers = await responseManufacturers.json()
    const dataVehicleModels = await responseVehicleModels.json()
    const dataSales = await responseSales.json()
    const dataSalesPersons = await responseSalesPersons.json()
    const dataSalesAutomobiles = await responseSalesAutomobiles.json()
    console.log()
    const dataSalesCustomers = await responseSalesCustomers.json()
    root.render(
      <React.StrictMode>
        <App automobiles={dataAutomobiles.autos} manufacturers={dataManufacturers.manufacturers} vehicleModels={dataVehicleModels.models} sales={dataSales.sales} salesPersons={dataSalesPersons.sales_persons} salesAutomobiles={dataSalesAutomobiles.automobileVOs} salesCustomers={dataSalesCustomers.customers} />
      </React.StrictMode>
    )
  } else {
    console.log("error")
  }
}
loadProps()

