import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

function Navigation() {
  const currentPage = useLocation().pathname;
  const isLoggedIn = Auth.loggedIn(); // Check if the user is logged in

  return (
    <ul className="nav nav-tabs justify-content-end">
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
  );
}

export default Navigation;
