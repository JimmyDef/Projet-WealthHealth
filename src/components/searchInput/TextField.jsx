import PropTypes from "prop-types";
import "./textField.scss";
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
TextField.propTypes = { search: PropTypes.string, onChange: PropTypes.func };
export default TextField;
