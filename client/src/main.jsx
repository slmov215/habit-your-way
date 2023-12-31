import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import GoalManagement from './components/GoalManagement.jsx';
import MyCalendar from './pages/MyCalendar.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/GoalManagement',
        element: <GoalManagement />
      }, {
        path: '/myCalendar',
        element: <MyCalendar />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Routes />
    </RouterProvider>
  </React.StrictMode>
);

