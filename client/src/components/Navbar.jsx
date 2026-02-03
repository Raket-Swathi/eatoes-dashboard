import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Eatoes Admin</h2>

      <div className="nav-links">
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </div>
    </nav>
  );
}