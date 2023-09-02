import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Login from './login/Login';
import './index.css'
import Behavioral from './Behavioral/Behavioral';
import Dashboard from './Dashboard/Dashboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
          </Route>
          <Route path="login" element={<Login />} />
            <Route path="Behavioral" element={<Behavioral />} /> 
              <Route path="Dashboard" element={<Dashboard />} /> 
        </Routes>
          
      </BrowserRouter>
  </React.StrictMode>
)
