import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';   
import './Dashboard.css';
import { Nullable } from 'primereact/ts-helpers';

function Dashboard() {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [checked, setChecked] = useState<boolean>(false);

  const customIcons = (
    <React.Fragment>
      <h2 style={{ marginRight: 12, textAlign: "left" }}>Add Clinic Event</h2>
      <Button icon="pi pi-th-large" className="fullscreen" onClick={() => setVisible(true)} />
    </React.Fragment>
  );
  const customHeader = (
    <React.Fragment>
      <h2 style={{ marginBottom: 0, maxWidth: 100 }}></h2>
    </React.Fragment>
  );

  return (
    <div className="Dashboard">
      <div className="card flex justify-content-center">
        <Sidebar header={customHeader} visible={visible} onHide={() => setVisible(false)} icons={customIcons}>
        <label className="content">Title *</label>
          <div className="card flex justify-content-center">    
            <InputText value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
          </div>
          <label className="content">Desired Attendance *</label>
          <div className="card flex justify-content-center">
            <InputText value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
          </div>
          <label className="content">Date *</label>
          <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} />
          </div>
          <div className="card flex">
            <Checkbox onChange={e => setChecked(e.checked)} checked={checked}> </Checkbox>
            <label className='BehavioralEvent'>Behavioral Health Event</label>
          </div>     
        </Sidebar>
        <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
      </div>
    </div>
  );
}

export default Dashboard;
