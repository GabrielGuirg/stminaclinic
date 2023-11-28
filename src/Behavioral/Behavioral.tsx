import './Behavioral.css';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { generalStore } from '../stores/generalStore';
import { json, useNavigate } from 'react-router-dom';
import { Image } from 'primereact/image';
import { classNames } from 'primereact/utils';
import { Formik } from 'formik';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';
import { ProgressSpinner } from 'primereact/progressspinner';

        

function Behavioral() {
  const [date, setDate] = useState('');
  const [checked, setChecked] = useState(false);
  const [patient, setPatient] = useState(null);
  const [defaultEventId, setDefaultEventId] = useState(null);
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);
  
  const navigate = useNavigate();

  const logout = generalStore((state: any) => state.logout);
  const addPatientToEvent = generalStore((state: any) => state.addPatientToEvent);

  const patientValid = [
    { label: "Yes, I am a new patient" },
    { label: "No, I am already a patient" }
  ];

  
  const getOpenEvents = generalStore((state: any) => state.getOpenEventsBehavioval);
  const events = generalStore((state: any) => state.events);

  useEffect(() => {
    getOpenEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      setDefaultEventId(events[0].id);
    } else {
      setDefaultEventId(null);
    }
    setIsMainPageLoading(false);
  }, [events]);

  return (
    <div >
      <Button label='Logout' onClick={() => {
        logout();
        navigate('/');
      }} />
      <div className="stmina">
      <Image src="https://stminaclinic.org/assets/st_mina.ico" alt="Image" width="160"/>
      </div>
      {defaultEventId == null && isMainPageLoading && <ProgressSpinner  />}
      {defaultEventId == null && !isMainPageLoading && <div>
        Sorry, No Open Spots Available
      </div>}
      <h1>St Mina Clinic Sign Up</h1>
      {defaultEventId != null && !isMainPageLoading && <Formik
          initialValues={{
            'eventId': defaultEventId,
            "firstName": '',
            "lastName": '',
            "phone": '',
            "email": '',
            "date": '',
            "address": '',
            "city": '',
            "zipCode": '',
            "noDoctorRequired": false,
            "newPatient": false
           }}
            validate={(values: any) => {
              const errors: any= {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                 errors.email = 'Invalid email address';
              }
              if (!values.firstName) { 
                errors.firstName = 'Required';
              } else if (values.firstName.length < 2) {
                errors.firstName = 'Invalid first name';
              }
              if (!values.lastName) { 
                errors.lastName = 'Required';
              } else if (values.lastName.length < 2) {
                errors.lastName = 'Last name is required';
              }
              if (!values.phone) { 
                errors.phone = 'Required';
              } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im) {
                errors.phone = 'Phone number is required';
              }
              // if (!values.date) {
              //  errors.date = 'Required';
              //  } 
              //  else if (!/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) {
              //    errors.date = "Date of birth required";
              //  }
              if (!values.address) {
                errors.address = 'Address Required';
              } 
              if (!values.city) {
                errors.city = 'City Required';
              }
              if (!values.zipCode) {
                errors.zipCode = 'Required';
              } else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/){
                errors.zipCode = 'Zip Code Required'
              }
              return errors;
            }}
                
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              const result = await addPatientToEvent(values, values.eventId, true);
              console.log(result.id);
              setSubmitting(false);
            }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-column">
              <div className="textbox-container flex flex-column">
                <div className="label">First Name</div>
                <InputText keyfilter="alpha" type="text" name="firstName" placeholder="First Name" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className={classNames({ 'p-invalid': errors.firstName && touched.firstName && errors.firstName })}/>
                    <small color='red'>{errors.firstName && touched.firstName && errors.firstName}</small>
              </div>
              <div className="textbox-container flex flex-column">
                <div className="label">Last Name</div>
                <InputText keyfilter="alpha" type="text" name="lastName" placeholder="Last Name" 
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.lastName}
                     className={classNames({ 'p-invalid': errors.lastName && touched.lastName && errors.lastName })}/>
                     <small color='red'>{errors.lastName && touched.lastName && errors.lastName}</small>
              </div>
              <div className="textbox-container flex flex-column">
                <div className="label">Phone Number</div>
                <InputText keyfilter="num" type="tel" name="phone" placeholder="Phone Number"                      
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.phone}
                     className={classNames({ 'p-invalid': errors.phone && touched.phone && errors.phone })}/>
                     <small color='red'>{errors.phone && touched.phone && errors.phone}</small>
              </div>
              <div className="textbox-container flex flex-column">
                <div className="label">Email Address</div>
                <InputText keyfilter="email" type="email" name="email" placeholder="Email Address" 
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.email}
                     className={classNames({ 'p-invalid': errors.email && touched.email && errors.email })}/>
                     <small color='red'>{errors.email && touched.email && errors.email}</small>
              </div>
              <div className="textbox-container flex flex-column w-7">
                <div className="label">Date of Birth</div>
                <Calendar value={date} onChange={(e: any) => setDate(e.value)} showIcon name="date"  placeholder="Date of Birth"
                     onBlur={handleBlur}
                     className={classNames({ 'p-invalid': errors.date && touched.date && errors.date })}/>
                     <small color='red'>{errors.date && touched.date && errors.date}</small>
              </div>
              <div className="address flex flex-column">
                <div className="label">Address</div>
                <InputText placeholder="Address" type="text" name="address" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      className={classNames({ 'p-invalid': errors.address && touched.address && errors.address })}/>
                      <small color='red'>{errors.address && touched.address && errors.address}</small>
              </div>
              <div className="address flex flex-column">
                <div className="label">City</div>
                <InputText keyfilter='alpha' placeholder="City" type="text" name="city" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      className={classNames({ 'p-invalid': errors.city && touched.city && errors.city })}/>
                      <small color='red'>{errors.city && touched.city && errors.city}</small>
              </div>
              <div className="address flex flex-column">
                <div className="label">Zip Code</div>
                <InputText keyfilter='num' placeholder="Zip Code" type="text" name="zipCode" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                      className={classNames({ 'p-invalid': errors.zipCode && touched.zipCode && errors.zipCode })}/>
                      <small color='red'>{errors.zipCode && touched.zipCode && errors.zipCode}</small>
              </div>
              <div className="address flex flex-row align-items-center">
                <InputSwitch checked={checked} onChange={(e: any) => {
                  console.log(checked);
                  setChecked(e.value);
                }}  name="noDoctorRequired" />
                <div className="check">Check if you need to ask questions to office staff and no doctor visits needed.</div>
              </div>
              <div className="patient flex flex-column">
                <div className="label">Are you a new patient?</div>
                
                <Dropdown name="newPatient" value={patient} onChange={(e) => setPatient(e.value)} options={patientValid} placeholder="Select One" />
              </div>
              <div className="textbox-containter flex flex-column align-center">
                <div className="label">Select Appointment Date *</div>
              
              <SelectButton unselectable={false} value={values.eventId} onChange={handleChange} name="eventId" optionLabel="date" options={events.map((e: any) => {
                  return {
                    'name': e.name,
                    'value': e.id,
                    'date': e.date.toDateString()
                  };
                })} /></div>
              <div className="p-4">
                <Button label="Reserve a spot" type="submit" className="w-12" disabled={isSubmitting}></Button>
              </div>
          </form>
          )}
        </Formik>}
    </div>
  );
}

export default Behavioral;
