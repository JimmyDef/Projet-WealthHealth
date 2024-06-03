import logoWebP from "./../../assets/logo.webp";
import logoPNG from "./../../assets/logo.png";
import "./header.scss";
import { NavLink } from "react-router-dom";

/**
 * Header component displaying the logo and navigation links.
 * @returns {JSX.Element} The JSX element representing the Header component.
 */

const Header = () => {
  return (
    <header className="header">
      <div className="img-wrapper">
        <picture>
          <source srcSet={logoWebP} type="image/webp" />
          <img src={logoPNG} alt="logo de Wealth Health" />
        </picture>
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
