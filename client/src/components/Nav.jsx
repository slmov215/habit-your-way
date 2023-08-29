import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import '../assets/Nav.css'
import webpageName from '../assets/images/habityourway.png'

function Navigation() {
  const currentPage = useLocation().pathname;
  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in

  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
        <img src={webpageName} style={{width:"20rem"}}></img>
        </a>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Activity
        </Link>
      </li>
      {isLoggedIn ? ( // Check if the user is logged in
        <>
          <li className="nav-item">
            <Link
              to="/CreatePost"
              className={currentPage === '/CreatePost' ? 'nav-link active' : 'nav-link'}
            >
              Create Post
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/MyCalendar"
              className={currentPage === '/MyCalendar' ? 'nav-link active' : 'nav-link'}
            >
              My Calendar
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              onClick={Auth.logout} // Call the logout function when clicked
              className="nav-link"
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link
              to="/Login"
              className={currentPage === '/Login' ? 'nav-link active' : 'nav-link'}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Signup"
              className={currentPage === '/Signup' ? 'nav-link active' : 'nav-link'}
            >
              Sign Up
            </Link>
          </li>
        </>
      )}
    </ul>
    </div>
    </nav>
    </>
  );
}

export default Navigation;
