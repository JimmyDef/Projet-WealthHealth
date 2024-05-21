import PropTypes from "prop-types";
import "./iconButton.scss";
const IconButton = ({ children, ...props }) => (
  <button className="pagination__icon-wrapper" {...props}>
    {children}
  </button>
);
IconButton.propTypes = {
  children: PropTypes.node.isRequired,
};
export default IconButton;
