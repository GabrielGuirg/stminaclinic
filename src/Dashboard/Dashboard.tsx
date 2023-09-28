import './dashboardstyle.css';
import { InputText } from 'primereact/inputtext';
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
        

function Dashboard() {
  const [date, setDate] = useState('');
  const [checked, setChecked] = useState('');
  const [patient, setPatient] = useState(null);
  const patientValid = [
    { label: "Yes, I am a new patient" },
    { label: "No, I am already a patient" }
  ];

  return (
    <div className="Info">
      <div className="textbox-container">
        <div className="label">First Name</div>
        <InputText keyfilter="alpha" placeholder="First Name" />
      </div>
      <div className="textbox-container">
        <div className="label">Last Name</div>
        <InputText keyfilter="alpha" placeholder="Last Name" />
      </div>
      <div className="textbox-container">
        <div className="label">Phone Number</div>
        <InputText keyfilter="num" placeholder="Phone Number" />
      </div>
      <div className="textbox-container">
        <div className="label">Email Address</div>
        <InputText keyfilter="email" placeholder="Email Address" />
      </div>
      <div className="textbox-container">
        <div className="label">Date of Birth</div>
        <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon placeholder="Date of Birth"/>
      </div>
      <div className="address">
        <div className="label">Address</div>
        <InputText placeholder="Address" />
      </div>
      <div className="address">
        <div className="label">City</div>
        <InputText keyfilter='alpha' placeholder="City" />
      </div>
      <div className="address">
        <div className="label">Zip Code</div>
        <InputText keyfilter='num' placeholder="Zip Code" />
      </div>
      <div className="address">
        <RadioButton value={checked} onChange={(e) => setChecked(e.value)}/>
        <text className="check">Check if you need to ask questions to office staff and no doctor visits needed.</text>
      </div>
      <div className="patient">
        <div className="label">Are you a new patient?</div>
        <Dropdown value={patient} onChange={(e) => setPatient(e.value)} options={patientValid} placeholder="Select One" />
      </div>
      <div className="reserving">
        <div className="resizeButton"></div>
      <Button label="Reserve a spot" severity="info" rounded />
      </div>
    </div>
  );
}

export default Dashboard;
