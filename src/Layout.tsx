import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="Layout flex flex-column">
      <div className="absolute top-0 right-0">
        <Button type="button" label="Login" link onClick={handleLoginClick} />
      </div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="behavioral">Behavioral</Link>
      <Link to="dashboard">Dashboard</Link>
    </div>
  );
}

export default Layout;


/* This controls the main page UI of the layout */ 
/* The changes to Link to = makes the port name different each time you change it */
/* I noticed in my href logjn that the port if you type capital Login or login it 
goes straight still to login page. */