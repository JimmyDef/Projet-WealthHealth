import PropTypes from "prop-types";
import "./iconButton.scss";

/**
 * IconButton component for displaying an icon button.
 * @module IconButton
 * @param {Object} props - The properties of the component.
 * @param {React.ReactNode} props.children - The child elements, typically an icon.
 * @param {string} props.label - The label for the icon button (screen reader text).
 * @returns {JSX.Element} The JSX element representing the icon button.
 */
const IconButton = ({ children, label, ...props }) => (
  <button className="pagination__icon-wrapper" {...props}>
    {children}
    <span className="sr-only">{label}</span>
  </button>
);

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default IconButton;
