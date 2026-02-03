import "./Layout.css";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Eatoes Admin</h2>

        <Link to="/">Menu Management</Link>
        <Link to="/orders">Orders</Link>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;