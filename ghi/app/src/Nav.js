import { NavLink } from 'react-router-dom';

function Nav() {
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
              <NavLink className="nav-link" aria-current="page" to="inventory/automobile/create/">New Automobile</NavLink>
            </li>
            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="inventory/automobiles/">Automobiles</NavLink>
            </li>
            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="inventory/model/create/">New Model</NavLink>
            </li>
            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="inventory/models/">Models</NavLink>
            </li>
            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="inventory/manufacturer/create/">New Manufacturer</NavLink>
            </li>
            <li className="nav-link">
              <NavLink className="nav-link" aria-current="page" to="inventory/manufacturers/"></NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
