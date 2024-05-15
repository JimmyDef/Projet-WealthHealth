import logo from "./../../assets/logo.png";
import "./header.scss";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <div className="img-wrapper">
        <img src={logo} alt="logo de Wealth Health" />
      </div>

      <h1>HRnet</h1>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/">
              Create <br />
              Employee
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee-database">
              Employees
              <br /> Database
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
