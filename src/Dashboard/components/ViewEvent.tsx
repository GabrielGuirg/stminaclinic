import { Formik } from "formik";
import { Card } from "primereact/card";
import { generalStore } from "../../stores/generalStore";
import { Button } from "primereact/button";
import { confirmPopup } from "primereact/confirmpopup";
import { useEffect } from "react";
import EditPatient from "./EditPatient";

function ViewEvent(props: { eventId: string; type: string }) {
  const getPatients = generalStore((state: any) => state.getPatientsByEventId);
  const patients = generalStore((state: any) => state.patients);

  useEffect(() => {
    getPatients(props.eventId, props.type);
  }, []);

  console.log(patients);

  const deletePatient = generalStore((state: any) => state.deletePatient);

  function deleteEventFunc(event: any) {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteEvent(props.eventId),
    });
  }

  function deletePat(event: any, patientID: string) {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => deletePatient(props.eventId, patientID, props.type), 
    });
  }

  const addSideBar = generalStore((state: any) => state.addSideBar);

  const deleteEvent = generalStore((state: any) => state.deleteEvent);
  return (
    <div>
      {props.eventId} {props.type}

      <Button icon="pi pi-trash" onClick={deleteEventFunc}>
        Delete
      </Button>
      <hr />
      {patients.map((p: any) => (
        <Card key={p.id}>
          <h4>
            {p.firstName} {p.lastName}
          </h4>
          <p>{p.email}</p>
          <p>{p.phone}</p>
          <p>
            {p.address} {p.city} {p.zipCode}
          </p>
          <hr />
          <div className="flex flex-row">
            <Button
              onClick={() => {
                addSideBar(<EditPatient eventId={props.eventId} patient={p} eventType={props.type} />);
              }}
            >
              Edit
            </Button>
            <div>
              <Button icon="pi pi-trash" onClick={(event) => deletePat(event, p.id)}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ViewEvent;
