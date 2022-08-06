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
import CreateTechnician from './CreateTechnician';
import SalesPersonForm from './CreateSalesPerson';
import SalesCustomerForm from './CreateSalesCustomer';
import SalesRecordForm from './CreateSaleRecord';
import ServiceAppointmentForm from './CreateServiceAppointment';
import AutomobileServiceHistory from './AutomobileServiceHistory';
import ServiceCustomerForm from './CreateServiceCustomer';



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
          <Route path="services/technician/create/" element={<CreateTechnician />} />
          <Route path="services/appointment/create/" element={<ServiceAppointmentForm />} />
          <Route path="services/automobile/history/" element={<AutomobileServiceHistory />} />
          <Route path="services/customer/create/" element={<ServiceCustomerForm />} />
          <Route path="sales/list/" element={<ListSales sales={props.sales} />} />
          <Route path="sales/sales_person_history/" element={<ListSalesPersonHistory sales={props.sales} salesPersons={props.salesPersons} />} />
          <Route path="sales/sales_person/create/" element={<SalesPersonForm />} />
          <Route path="sales/sales_customer/create/" element={<SalesCustomerForm />} />
          <Route path="sales/create/" element={<SalesRecordForm sales_persons={props.salesPersons} salesAutomobiles={props.salesAutomobiles} salesCustomers={props.salesCustomers} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
