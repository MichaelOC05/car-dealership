import { NavLink } from 'react-router-dom';

function NavServices() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="services/list/">Service Appointments</NavLink>
            </li>    

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="services/automobile/history/">Service Appointment History</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="services/technician/create/">New Technician</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="services/customer/create/">New Service Customer</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="services/appointment/create/">New Service Appointment</NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavServices;
