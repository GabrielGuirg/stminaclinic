import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { generalStore } from "../../stores/generalStore";

function AddEvent() {

    const popSideBar = generalStore((state: any) => state.popSideBar);
    const addEvent = generalStore((state: any) => state.addEvent);

    return (
        <div>
            <Formik
              initialValues={{  desiredAttendance: 10, isBehavioral: false }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                await addEvent(values);
                actions.setSubmitting(false);
                popSideBar();
                console.log(values);
              }}
            >
              {props => (
                <Form>
                  <div>

                    <label className="content">Desired Attendance *</label>
                    <div className="card flex justify-content-center">
                      <Field type="number" name="desiredAttendance" as={InputText} />
                    </div>
                    <ErrorMessage name="desiredAttendance" component="div" className="feedback" />

                    <label className="content">Date *</label>
                    <div className="card flex justify-content-center">
                      <Field name="date" as={Calendar} />
                    </div>

                    <div className="card flex">
                      <Checkbox
                        name="isBehavioral"
                        checked={props.values.isBehavioral}
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

export default AddEvent;