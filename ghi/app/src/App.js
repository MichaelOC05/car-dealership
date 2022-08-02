import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileForm from './CreateAutomobile';
import VehicleModelForm from './CreateVehicleModel';
import ManufacturerForm from './CreateManufacturer';
import ListAutomobiles from './ListAutomobile';
import ListManufactures from './ListManufacturers';
import ListVehicleModels from './ListVehicleModel';


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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
