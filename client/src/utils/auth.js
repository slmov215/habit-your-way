import decode from 'jwt-decode';
// import { checkTokenExpiration } from './authUtils';

class AuthService {
  // Get user data from the decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in (valid token and not expired)
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token) && checkTokenExpiration(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Get the token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Log in the user by saving the token to localStorage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Log out the user by removing the token from localStorage
  logout() {
    localStorage.removeItem('id_token');
    // Reload the page to reset the application state
    window.location.assign('/');
  }
}

// Check if a token is expired
function checkTokenExpiration(token) {
  const decoded = decode(token);
  const currentTime = Date.now() / 1000; // Convert to seconds
  return decoded.exp > currentTime;
}

export default new AuthService();
