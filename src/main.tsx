import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
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
            <Route path="Behavioral" element={<Behavioral />} /> 
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="Dashboard" element={<Dashboard />} /> 
        </Routes>
          
      </BrowserRouter>
  </React.StrictMode>
)
