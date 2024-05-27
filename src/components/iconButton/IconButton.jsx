import PropTypes from "prop-types";
import "./iconButton.scss";
const IconButton = ({ children, label, ...props }) => (
  <button className="pagination__icon-wrapper" {...props}>
    {children}
    <span className="sr-only">{label}</span>
    {/* Alt text for screen reader only */}
  </button>
);
IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
};
export default IconButton;
