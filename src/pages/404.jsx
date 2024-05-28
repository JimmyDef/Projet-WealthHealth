import { Link } from "react-router-dom";
import "./404.scss";

/**
 * NotFound is a React component that displays a 404 error message.
 * It includes a message indicating that something went wrong and a link to return to the home page.
 *
 * @returns {JSX.Element} The JSX rendered output of the NotFound component.
 */

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <h1>404</h1>
      <p>Quelque chose s&apos;est mal passé ... Revenez plus tard.</p>
      <Link to="/"> Retour page d&apos;accueil</Link>
    </div>
  );
};
export default NotFound;
