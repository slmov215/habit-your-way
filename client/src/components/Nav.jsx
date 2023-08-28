import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const currentPage = useLocation().pathname;

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
      <li className="nav-item">
        <Link
          to="/CreatePost"
          className={currentPage === '/CreatePost' ? 'nav-link active' : 'nav-link'}
        >
          Create Post
        </Link>
      </li>
     
    </ul>
  );
}

export default Navigation;
