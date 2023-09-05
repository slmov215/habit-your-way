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
    return !!token && !this.isTokenExpired(token);
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

  // login(token) {
  //   localStorage.setItem('id_token', token); // Store the token in local storage
  //   window.location.assign('/'); // Redirect to the homepage or another appropriate location
  // }
  
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
  
  getUserId() {
    const token = this.getToken();
    const decoded = decode(token);
    return decoded ? decoded.userId : null;
  }

}

export default new AuthService();
