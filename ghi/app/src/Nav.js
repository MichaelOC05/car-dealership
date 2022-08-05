import { NavLink } from 'react-router-dom';

function Nav({childToParent}) {
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
              <NavLink className="nav-link" aria-current="page" to="inventory/" onClick={() => childToParent(1)}>Inventory</NavLink>
            </li>

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="services/" onClick={() => childToParent(3)}>Services</NavLink>
            </li>    

            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="sales/" onClick={() => childToParent(2)}>Sales</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
