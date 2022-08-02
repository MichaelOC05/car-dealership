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
  const responseManufacturers = await fetch('http://localhost:8100/api/manufacturers/')
  const responseVehicleModels = await fetch('http://localhost:8100/api/models/')
  if (responseAutomobiles.ok && responseManufacturers.ok && responseVehicleModels.ok) {
    const dataAutomobiles = await responseAutomobiles.json()
    const dataManufacturers = await responseManufacturers.json()
    const dataVehicleModels = await responseVehicleModels.json()
    console.log(dataAutomobiles)
    console.log(dataManufacturers)
    console.log(dataVehicleModels)
    root.render(
      <React.StrictMode>
        <App automobiles={dataAutomobiles.autos} manufacturers={dataManufacturers.manufacturers} vehicleModels={dataVehicleModels.models} />
      </React.StrictMode>
    )
  } else {
    console.log("error")
  }
}
loadProps()

