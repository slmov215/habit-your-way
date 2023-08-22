import { Link, useLocation } from 'react-router-dom';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function Navigation() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs justify-content-end">
      <li className="nav-item">
        <Link
          to="/"
     
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          About
        </Link>
      </li>
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
     
    </ul>
  );
}

export default Navigation;
