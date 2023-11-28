import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { generalStore } from "../../stores/generalStore";

function EditEvent(props: {eventId: string, desiredAttendence: number, isBehavioral: boolean, date: Date}) {

    const popSideBar = generalStore((state: any) => state.popSideBar);
    const updateEvent = generalStore((state: any) => state.updateEvent);
    console.log(props.eventId);

    // in general store write the update event func and inside it getEvents and close sidebar and toast

    return (
        <div>
            <Formik
              initialValues={{ desiredAttendance: props.desiredAttendence, isBehavioral: props.isBehavioral, date: props.date }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                await updateEvent(props.eventId, values);
                actions.setSubmitting(false);
                popSideBar();
                console.log(values);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur
              }) => (
                <Form>
                  <div>
                    <label className="content">Desired Attendance *</label>
                    <div className="card flex justify-content-center">
                      <Field type="number" value={values.desiredAttendance} name="desiredAttendance" as={InputText} />
                    </div>
                    <ErrorMessage name="desiredAttendance" component="div" className="feedback" />

                    <label className="content">Date *</label>
                    <div className="card flex justify-content-center">
                      <Field name="date" as={Calendar} />
                    </div>

                    <div className="card flex">
                      <Checkbox
                        name="isBehavioral"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.isBehavioral}
                      />
                      <label className='BehavioralEvent'>Behavioral Health Event</label>
                    </div>
                  </div>
                  <br/>
                  <Button type="submit" label="Submit" className="p-button-primary" />
                </Form>
              )}
            </Formik>
          </div>
    )
}

export default EditEvent;