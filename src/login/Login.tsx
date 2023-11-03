import { Card } from 'primereact/card';
import { generalStore } from '../stores/generalStore';
import { Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from 'reactfire';
import { Image } from 'primereact/image';

import './login.css'

        

function Login() {
  const sendToasts = generalStore((state: any) => state.sendToasts);
  const setLoading = generalStore((state: any) => state.setLoading);
  const setUsers = generalStore((state: any) => state.setUsers);
  
  const auth = useAuth();   

  const handleLogin = () => {
    // Perform your login logic here, e.g., send the username and password to a server
    // and handle the response.

    // For demonstration purposes, we'll just display the entered values in a toast.
    sendToasts([{
      severity: 'success',
      summary: 'Successful',
    }]);
  };

  
  const login = async (values: any) => {
    try {
        setLoading(true);
        const res: UserCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        setUsers(res);
        setTimeout(() => {
          window.location.href = 'dashboard';
        }, 1000);
        setLoading(false);
        sendToasts([{
          severity: 'success',
          summary: 'Successful',
        }]);
    } catch (e: any) {
        let message = "";
        switch (e.code) {
            case "auth/invalid-password":
                message = "Password provided is not corrected";
                break;
            case "auth/invalid-email":
                message = "Email provided is invalid";
                break;
            case "auth/user-not-found":
                message = "Email not found!";
                break;
            default:
                message = "Invalid Email/Password";
        }
        setLoading(false);    
        sendToasts([{
          severity: 'error',
          summary: message,
        }]);
    }
}

  return (
    <div className="Login">
      <div className="login-box">
        <div className="cardstyle">
            <Card title ="St. Mina Clinic Login" className="md:w-25rem md:h-40rem">
              <div className="stmina">
            <Image src="https://stminaclinic.org/assets/st_mina.ico" alt="Image" width="160"/>
              </div>
            <Formik
              initialValues={{ email: '', password: '' }}
                validate={(values: any) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  login(values);
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
                  <div className="flex flex-column gap-2">
                    <label className='info' htmlFor="email">Email</label>
                    <InputText type="email" 
                      className={classNames({ 'p-invalid': errors.email && touched.email && errors.email })}
                      name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                      <small color='red'>{errors.email && touched.email && errors.email}</small>
                  </div>
                  <div className="flex flex-column gap-2">
                    <label className='info' htmlFor='password'>Password</label>
                    <InputText
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={classNames({ 'p-invalid': errors.password && touched.password && errors.password })}
                    />
                    <small color='red'>{errors.password && touched.password && errors.password}</small>
                  </div>
                  <br/>
                  <Button label="Login" type="submit" disabled={isSubmitting}></Button>
              </form>
              )}
            </Formik>
        </Card>
        </div>
      </div>
    </div>
   
    
  );
}

export default Login;
