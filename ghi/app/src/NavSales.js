import { NavLink } from 'react-router-dom';

function NavSales({childToParent}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" onClick={() => childToParent(0)}>CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="sales/list/">Sales List</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="sales/sales_person_history/">Sales History</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="sales/sales_person/create/">New Sales Person</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="sales/sales_customer/create/">New Sales Customer</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="sales/create/">New Sale</NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavSales;