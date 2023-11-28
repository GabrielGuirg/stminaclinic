import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import './Dashboard.css';
import { generalStore } from '../stores/generalStore';
import AddEvent from './components/AddEvent';
import MainSidebar from '../main-sidebar/MainSidebar';
import EditEvent from './components/EditEvent';
import ViewEvent from './components/ViewEvent';

function Dashboard() {
  const events = generalStore((state: any) => state.events);
  const getEvents = generalStore((state: any) => state.getEvents);

  useEffect(() => {
    getEvents();
  }, []);

  const addSideBar = generalStore((state: any) => state.addSideBar);

  return (
    <div className="Dashboard">
      <div className="card flex justify-content-center">
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
                      addSideBar(<ViewEvent eventId={e.id} type={e.isBehavioral ? 'behavioral': 'clinic'}  />);
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
