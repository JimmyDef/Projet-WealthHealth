import PropTypes from "prop-types";
import "./textField.scss";

/**
 * Text field component for user search input.
 * @param {Object} props - The props object.
 * @param {string} props.search - The search query.
 * @param {function} props.onChange - The onChange event handler.
 * @returns {JSX.Element} A text field component.
 */

const TextField = ({ search, onChange }) => {
  return (
    <div className="textfield-group">
      <input
        required
        value={search}
        onChange={onChange}
        type="search"
        name="text"
        autoComplete="off"
        className="textfield__input"
        id="textfield"
      />
      <label htmlFor="textfield" className="textfield__label">
        Search
      </label>
    </div>
  );
};
TextField.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default TextField;
