import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SubPageInventory from './SubPageInventory';
import SubPageSales from './SubPageSales';
import SubPageServices from './SubPageServices';
import Nav from './Nav';
import NavInventory from './NavInventory';
import NavSales from './NavSales';
import NavServices from './NavServices';
import AutomobileForm from './CreateAutomobile';
import VehicleModelForm from './CreateVehicleModel';
import ManufacturerForm from './CreateManufacturer';
import ListAutomobiles from './ListAutomobile';
import ListManufactures from './ListManufacturers';
import ListVehicleModels from './ListVehicleModel';
import ListServices from './ListServices';
import ListSales from './ListSales';
import ListSalesPersonHistory from './ListSalesPersonHistory';
import CreateTechnician from './CreateTechnician';
import SalesPersonForm from './CreateSalesPerson';
import SalesCustomerForm from './CreateSalesCustomer';
import SalesRecordForm from './CreateSaleRecord';
import ServiceAppointmentForm from './CreateServiceAppointment';
import AutomobileServiceHistory from './AutomobileServiceHistory';
import ServiceCustomerForm from './CreateServiceCustomer';
import { useState } from 'react'

let CurrentNav

function App(props) {

  const [navState, setNavState] = useState(0)
  
  const childToParent = async (navData) => {
    await setNavState(navData)
  }
  if (navState == 0) {
    CurrentNav = Nav
  } else if (navState == 1) {
    CurrentNav = NavInventory
  } else if (navState == 2) {
    CurrentNav = NavSales
  } else if (navState == 3) {
    CurrentNav = NavServices
  }

  
  return (
    <BrowserRouter>
      <CurrentNav childToParent={childToParent} />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage childToParent={childToParent}/>} /> 
          <Route path="inventory/" element={<SubPageInventory childToParent={childToParent} />} />
          <Route path="services/" element={<SubPageServices childToParent={childToParent}/>} />
          <Route path="sales/" element={<SubPageSales childToParent={childToParent}/>} />
          <Route path="inventory/automobile/create/" element={<AutomobileForm childToParent={childToParent}/>} />
          <Route path="inventory/model/create/" element={<VehicleModelForm childToParent={childToParent}/>} />
          <Route path="inventory/manufacturer/create/" element={<ManufacturerForm childToParent={childToParent}/>} />
          <Route path="inventory/automobiles/" element={<ListAutomobiles automobiles={props.automobiles} childToParent={childToParent}/>} />
          <Route path="inventory/manufacturers/" element={<ListManufactures manufacturers={props.manufacturers} childToParent={childToParent} />} />
          <Route path="inventory/models/" element={<ListVehicleModels models={props.vehicleModels} childToParent={childToParent}/>} />
          <Route path="services/list/" element={<ListServices childToParent={childToParent} />} />
          <Route path="services/technician/create/" element={<CreateTechnician childToParent={childToParent} />} />
          <Route path="services/appointment/create/" element={<ServiceAppointmentForm childToParent={childToParent} />} />
          <Route path="services/automobile/history/" element={<AutomobileServiceHistory childToParent={childToParent} />} />
          <Route path="services/customer/create/" element={<ServiceCustomerForm childToParent={childToParent} />} />
          <Route path="sales/list/" element={<ListSales sales={props.sales} childToParent={childToParent} />} />
          <Route path="sales/sales_person_history/" element={<ListSalesPersonHistory sales={props.sales} salesPersons={props.salesPersons} childToParent={childToParent} />} />
          <Route path="sales/sales_person/create/" element={<SalesPersonForm childToParent={childToParent} />} />
          <Route path="sales/sales_customer/create/" element={<SalesCustomerForm childToParent={childToParent} />} />
          <Route path="sales/create/" element={<SalesRecordForm sales_persons={props.salesPersons} salesAutomobiles={props.salesAutomobiles} salesCustomers={props.salesCustomers} childToParent={childToParent} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
