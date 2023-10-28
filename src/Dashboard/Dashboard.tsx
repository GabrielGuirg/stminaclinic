import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import './Dashboard.css';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik and related components
import { generalStore } from '../stores/generalStore';
import AddEvent from './components/AddEvent';
import MainSidebar from '../main-sidebar/MainSidebar';

function Dashboard() {

  const events = generalStore((state: any) => state.events);
  const deleteEvent = generalStore((state: any) => state.deleteEvent);
  const getEvents = generalStore((state: any) => state.getEvents);

  useEffect(() => {
    getEvents();
  }, []);

  const addSideBar = generalStore((state: any) => state.addSideBar);
  return (
    <div className="Dashboard">
      <div className="card flex justify-content-center">
        {
          events.map((e: any) => <p key={e.id}>{e.name} <Button onClick={() => deleteEvent(e.id)} >Delete</Button> </p>)
        }
        <Button icon="pi pi-plus" onClick={() => {
          addSideBar(<AddEvent />);
        }} />
      </div>
      <MainSidebar />
    </div>
  );
}

export default Dashboard;
