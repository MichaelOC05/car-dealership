import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileForm from './CreateAutomobile';
import VehicleModelForm from './CreateVehicleModel';
import ManufacturerForm from './CreateManufacturer';
import ListAutomobiles from './ListAutomobile';
import ListManufactures from './ListManufacturers';
import ListVehicleModels from './ListVehicleModel';
import ListServices from './ListServices';
import ListSales from './ListSales';
import ListSalesPersonHistory from './ListSalesPersonHistory';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory/automobile/create/" element={<AutomobileForm />} />
          <Route path="inventory/model/create/" element={<VehicleModelForm />} />
          <Route path="inventory/manufacturer/create/" element={<ManufacturerForm />} />
          <Route path="inventory/automobiles/" element={<ListAutomobiles automobiles={props.automobiles}/>} />
          <Route path="inventory/manufacturers/" element={<ListManufactures manufacturers={props.manufacturers} />} />
          <Route path="inventory/models/" element={<ListVehicleModels models={props.vehicleModels} />} />
          <Route path="services/list/" element={<ListServices />} />
          <Route path="sales/" element={<ListSales sales={props.sales} />} />
          <Route path="sales/sales_person_history/" element={<ListSalesPersonHistory sales={props.sales} salesPersons={props.salesPersons} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
