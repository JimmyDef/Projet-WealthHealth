import { Link } from "react-router-dom";

import "./404.scss";

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
