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
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import EditEvent from './components/EditEvent';


function Dashboard() {

  const events = generalStore((state: any) => state.events);
  const deleteEvent = generalStore((state: any) => state.deleteEvent);
  const getEvents = generalStore((state: any) => state.getEvents);

  useEffect(() => {
    getEvents();
  }, []);

  function deleteEventFunc(event: any, eventId: string) {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteEvent(eventId),
  });
  }

  const addSideBar = generalStore((state: any) => state.addSideBar);
  return (
    <div className="Dashboard">
      {}
      <div className="card flex justify-content-center">
        {
          events.map((e: any) => <p key={e.id}>{e.date.toDateString()} <Button onClick={($event) => deleteEventFunc($event, e.id)} >Delete</Button> </p>)
        }
        <Button icon="pi pi-plus" onClick={() => {
          addSideBar(<AddEvent />);
        }} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Behavioral</th>
              <th>Desired Patient #</th>
              <th>Current Patient #</th>
              <th>Closed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e:any)=> <tr key={`event-table-${e.id}`}>
              <td>{e.date.toDateString()}</td>
              <td>{e.isBehavioral ? 'Yes': 'No'}</td>
              <td>{e.desiredAttendance}</td>
              <td>{e.totalPatient ?? 0}</td>
              <td>{e.closed}</td>
              <td>
                
        <Button icon="pi pi-plus" onClick={() => {
          addSideBar(<EditEvent eventId={e.id} desiredAttendence={e.desiredAttendance} isBehavioral={e.isBehavioral} date={e.date} />);
        }} /> | VIEW
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <MainSidebar />
    </div>
  );
}

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { Sidebar } from 'primereact/sidebar';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Calendar } from 'primereact/calendar';
// import { Checkbox } from 'primereact/checkbox';
// import './Dashboard.css';
// import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik and related components
// import { generalStore } from '../stores/generalStore';
// import AddEvent from './components/AddEvent';
// import MainSidebar from '../main-sidebar/MainSidebar';
// import EditEvent from './components/EditEvent';

// function Dashboard() {

//   const events = generalStore((state: any) => state.events);
//   const deleteEvent = generalStore((state: any) => state.deleteEvent);
//   const getEvents = generalStore((state: any) => state.getEvents);

//   useEffect(() => {
//     getEvents();
//   }, []);

//   const addSideBar = generalStore((state: any) => state.addSideBar);
  
//   const openAddEventSidebar = () => {
//     addSideBar(<AddEvent />);
//   };

//   const openEditEventSidebar = () => {
//     addSideBar(<EditEvent />);
//   };

//   return (
//     <div className="Dashboard">
//       <div className="card flex justify-content-center">
//         {
//           events.map((e: any) => (
//             <p key={e.id}>
//               {e.name} <Button icon="pi pi-trash" onClick={() => deleteEvent(e.id)}>Delete</Button>
//             </p>
//           ))
//         }
//         <Button icon="pi pi-plus" onClick={openAddEventSidebar} />
//         <Button icon="pi pi-pencil" onClick={openEditEventSidebar} />
//       </div>
//       <MainSidebar />
//     </div>
//   );
// }

// export default Dashboard;

