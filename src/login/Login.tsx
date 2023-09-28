import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import './loginstyle.css'
        

function Login() {
  const toast = useRef<Toast>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform your login logic here, e.g., send the username and password to a server
    // and handle the response.

    // For demonstration purposes, we'll just display the entered values in a toast.
    toast.current?.show({
      severity: 'success',
      summary: 'Successful',
    });
  };

  return (
    <div className="Login">
      <div className="login-box">
        <div className="cardstyle">
        <Card title ="St. Mina Clinic Login" className="md:w-25rem md:h-25rem">
        <h2>Login Page</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        </Card>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
    
  );
}

export default Login;
