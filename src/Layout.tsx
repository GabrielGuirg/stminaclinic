import { Outlet, Link } from "react-router-dom";
import { Button } from 'primereact/button';

function Layout() {
    return (
      <div className="Layout flex flex-column">
        HERE IS MY LAYOUT
        <Link to="/" >Home</Link>
        <Link to="/login" >Login</Link>
        <Link to="behavioral"> Behavioral</Link>
        <Link to="dashboard"> Dashboard</Link>
        <Outlet />
      </div>
    );
  }
  
  export default Layout;

/* This controls the main page UI of the layout */ 
/* The changes to Link to = makes the port name different each time you change it */