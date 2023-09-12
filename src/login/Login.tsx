import { Toast } from 'primereact/toast';
import { useRef } from 'react'

function Login() {
  const toast = useRef<Toast>(null);

  return (
    <div className="Login">
      This is the Login Page
      <Toast ref={toast} />
    </div>
  );
}

export default Login;