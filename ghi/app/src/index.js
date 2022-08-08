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
  let fetchUrls = []
  fetchUrls.push(fetch('http://localhost:8100/api/automobiles/'))
  fetchUrls.push(fetch('http://localhost:8090/api/sales/automobiles/'))
  fetchUrls.push(fetch('http://localhost:8090/api/sales/customers/'))
  fetchUrls.push(fetch('http://localhost:8100/api/manufacturers/'))
  fetchUrls.push(fetch('http://localhost:8100/api/models/'))
  fetchUrls.push(fetch('http://localhost:8090/api/sales/'))
  fetchUrls.push(fetch('http://localhost:8090/api/sales/sales_person/'))

  const responses = await Promise.all(fetchUrls)
  // if (responses.ok) {
    const data = []
    for (let response of responses) {
      if (response.ok) {
        data.push(await response.json())
      }
    }
    console.log(data.length)
    if (data.length == 7) {
    const dataAutomobiles = data[0]
    // console.log(dataAutomobiles)
    const dataManufacturers = data[1]
    const dataVehicleModels = data[2]
    const dataSales = data[3]
    const dataSalesPersons = data[4]
    const dataSalesAutomobiles = data[5]
    const dataSalesCustomers = data[6]
    root.render(
      <React.StrictMode>
        {/* <App /> */}
        <App automobiles={dataAutomobiles.autos} manufacturers={dataManufacturers.manufacturers} vehicleModels={dataVehicleModels.models} sales={dataSales.sales} salesPersons={dataSalesPersons.sales_persons} salesAutomobiles={dataSalesAutomobiles.automobileVOs} salesCustomers={dataSalesCustomers.customers} />
      </React.StrictMode>
    )
  } else {
    console.log("error")
  }
}
loadProps()

