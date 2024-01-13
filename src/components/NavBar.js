import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

function NavBar() {
  // Use the useNavigate hook from react-router-dom to enable navigation
  const navigate = useNavigate();

  // Function to handle logout by removing the authentication token from localStorage and navigating to the login page
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  }

  return (
    <div>
      {/* Bootstrap navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Brand link */}
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">
            ZOOPZOOP
          </Link>
          {/* Toggle button for responsive design */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              {/* Home link */}
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {/* Conditional rendering of My Orders link based on authentication token */}
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">
                    My Orders
                  </Link>
                </li>
                : ""}
            </ul>
            {/* Conditional rendering of Login/SignUp or Cart/Logout links based on authentication token */}
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                {/* Cart link with badge for item count */}
                <div className='btn bg-white text-success mx-2'>
                  My Cart {" "}
                  <Badge pill bg="danger" > 2 </Badge>
                </div>
                {/* Logout button */}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

