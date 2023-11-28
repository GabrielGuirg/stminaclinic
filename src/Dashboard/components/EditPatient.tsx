import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button } from "primereact/button";
import { generalStore } from "../../stores/generalStore";
import { InputText } from "primereact/inputtext";

function EditPatient(props: {patient: any, eventId: string, eventType: string}) {

    const popSideBar = generalStore((state: any) => state.popSideBar);
    const updatePatient = generalStore((state: any) => state.updatePatient);

    const { eventId, patient, eventType } = props;

    console.log(eventId, patient);

    // in general store write the update event func and inside it getEvents and close sidebar and toast

    return (
        <div>
            <Formik
              initialValues={{ ...patient }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                await updatePatient(eventId, patient.id, eventType, values);
                actions.setSubmitting(false);
                popSideBar();
              }}
            >
              {({
                values,
                handleChange,
                handleBlur
              }) => (
                <Form>
                  <div>
                    
                  <label className="content">First Name *</label>
                  <div className="card flex justify-content-center">
                      <Field type="text" value={values.firstName} name="firstName" as={InputText} />
                    </div>
                    <ErrorMessage name="firstName" component="div" className="feedback" />

                    <label className="content">Last Name *</label>
                  <div className="card flex justify-content-center">
                      <Field type="text" value={values.lastName} name="lastName" as={InputText} />
                    </div>
                    <ErrorMessage name="lastName" component="div" className="feedback" />

                    <label className="content">Email *</label>
                  <div className="card flex justify-content-center">
                      <Field type="text" value={values.email} name="email" as={InputText} />
                    </div>
                    <ErrorMessage name="email" component="div" className="feedback" />

                    <label className="content">Phone Number *</label>
                  <div className="card flex justify-content-center">
                      <Field type="text" value={values.phone} name="phone" as={InputText} />
                    </div>
                    <ErrorMessage name="phone" component="div" className="feedback" />

                    <label className="content">Address *</label>
                  <div className="card flex justify-content-center">
                      <Field type="text" value={values.address} name="address" as={InputText} />
                    </div>
                    <ErrorMessage name="address" component="div" className="feedback" />

                    <label className="content">City *</label>
                  <div className="card flex justify-content-center">
                      <Field type="text" value={values.city} name="city" as={InputText} />
                    </div>
                    <ErrorMessage name="city" component="div" className="feedback" />

                    <label className="content">Zip Code *</label>
                  <div className="card flex justify-content-center">
                      <Field type="text" value={values.zipCode} name="zipCode" as={InputText} />
                    </div>
                    <ErrorMessage name="zipCode" component="div" className="feedback" />

                  </div>
                  <br/>
                  <Button type="submit" label="Submit" className="p-button-primary" />
                </Form>
              )}
            </Formik>
          </div>
    )
}

export default EditPatient;