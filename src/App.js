import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { useState, useRef, useEffect } from 'react';
import { Pushup } from './pages/Exercise/Pushup/Pushup';

function App() {
  const [maxDistance, setmaxDistance] = useState(69);
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Login/>
    },
    {
      path:"/home",
      element:<Home />
    },
    {
      path:"/Pushup",
      element:<Pushup/>
    }
  ]);

  return (
    <RouterProvider router={router}/>
    
  );
}

export default App;
