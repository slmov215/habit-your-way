// Function to save the token to local storage
export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

// Function to retrieve the token from local storage
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

// Function to remove the token from local storage
export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};
