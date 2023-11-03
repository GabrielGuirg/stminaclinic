import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import './Dashboard.css';
import { generalStore } from '../stores/generalStore';
import AddEvent from './components/AddEvent';
import MainSidebar from '../main-sidebar/MainSidebar';
import { confirmPopup } from 'primereact/confirmpopup';
import EditEvent from './components/EditEvent';
import { Card } from 'primereact/card';
import { Field, Form, Formik } from 'formik';

function Dashboard() {
  const events = generalStore((state: any) => state.events);
  const deleteEvent = generalStore((state: any) => state.deleteEvent);
  const getEvents = generalStore((state: any) => state.getEvents);

  useEffect(() => {
    getEvents();
  }, []);

  function deleteEventFunc(EventId: any) {
    confirmPopup({
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteEvent(EventId),
    });
  }

  const addSideBar = generalStore((state: any) => state.addSideBar);

  return (
    <div className="Dashboard">
      <div className="card flex justify-content-center">
        {events.map((e:any) => (
          <div key={e.id}>
            <p>{e.date.toDateString()}</p>
            <Button
              icon="pi pi-trash"
              onClick={() => deleteEventFunc(e.id)}
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          icon="pi pi-plus"
          onClick={() => {
            addSideBar(<AddEvent />);
          }}
        />
      </div>
      <div>
      <table className="grid-table">
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
            {events.map((e: any) => (
              <tr key={`event-table-${e.id}`}>
                <td>{e.date.toDateString()}</td>
                <td>{e.isBehavioral ? 'Yes' : 'No'}</td>
                <td>{e.desiredAttendance}</td>
                <td>{e.totalPatient ?? 0}</td>
                <td>{e.closed}</td>
                <td>
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => {
                      addSideBar(
                        <EditEvent
                          eventId={e.id}
                          desiredAttendence={e.desiredAttendance}
                          isBehavioral={e.isBehavioral}
                          date={e.date}
                        />
                      );
                    }}
                  />
                  <Button
                    icon="pi pi-user"
                    onClick={() => {
                      addSideBar(
                        <Card title="Title">
                          <Formik
                              initialValues={{
                                eventId: e.id,
                                firstName: '', // Initialize with values from your database
                                lastName: '',
                                phone: '',
                                email: '',
                                date: '',
                                address: '',
                                city: '',
                                zipCode: '',
                                noDoctorRequired: false,
                                newPatient: false,
                              }}
                              onSubmit={(values) => {
                                // Handle form submission here
                              }}
                            >
                            </Formik>
                        </Card>
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MainSidebar />
    </div>
  );
}

export default Dashboard;
