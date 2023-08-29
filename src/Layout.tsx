import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
      <div className="Layout flex flex-column">
        HERE IS MY LAYOUT
        <Link to="/" >Home</Link>
        <Link to="/login" >Login</Link>
        <Outlet />
      </div>
    );
  }
  
  export default Layout;