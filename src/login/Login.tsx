import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function showToastMessage() {
  toast.success('Successful Login', { position: toast.POSITION.BOTTOM_RIGHT });
}

function Login() {
  useEffect(() => {
    // Trigger the toast when the Login component is mounted
    showToastMessage();
  }, []); /* Thought this could help?????? idk i had to search up*/

  return (
    <div className="Login">
      This is the Login Page
      <ToastContainer />
    </div>
  );
}

export default Login;