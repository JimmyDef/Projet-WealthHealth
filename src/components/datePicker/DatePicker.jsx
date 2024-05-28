import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./datePicker.scss";

/**
 * CustomDatePicker Component for selecting dates.
 * @module CustomDatePicker
 * @param {Object} props - The properties of the component.
 * @param {string} props.id - The id of the date picker input.
 * @param {boolean} props.ageControl - Indicates if the user can choose a date < 18 years.
 * @param {boolean} props.inputError - Indicates if an error/empty field is detected after submission.
 * @param {Date | undefined} props.state - The selected date.
 * @param {Function} props.setState - Function to set the selected date.
 * @returns {JSX.Element} Returns the JSX of the CustomDatePicker component.
 */

const CustomDatePicker = ({
  id,
  ageControl,
  inputError,
  state: startDate,
  setState,
}) => {
  /**
   * Sets the date range that can be chosen in the date picker if needed.
   * @constant {Date} today - The current date.
   * @constant {Date} minDate - The minimum date that can be selected in the date picker.
   * @constant {Date} maxDate - The maximum date that can be selected in the date picker.
   */

  const today = new Date();
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(today.getFullYear() - 80);
  maxDate.setFullYear(today.getFullYear() - 18);

  /**
   * Custom container component for the date picker calendar.
   * @param {Object} props - The properties of the component.
   * @param {string} props.className - The CSS class name.
   * @param {React.ReactNode} props.children - The child elements.
   * @returns {JSX.Element} The JSX element representing the custom container.
   */
  const MyContainer = ({ className, children }) => {
    return (
      <div className="pop-up-wrapper">
        <CalendarContainer className={className}>
          <div className="pop-up-wrapper-child">{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  MyContainer.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  };

  /**
   * Adds custom CSS classes to specific dates in the calendar.
   * @param {Date} date - The date to apply classes to.
   * @returns {string | undefined} The CSS classes for the date.
   */

  const dayClassName = (date) => {
    if (
      startDate &&
      date.toDateString() === startDate.toDateString() &&
      date.toDateString() === today.toDateString()
    ) {
      return "selected-and-today";
    }
    if (date.toDateString() === today.toDateString())
      return "date-picker-today";

    if (startDate && date.toDateString() === startDate.toDateString())
      return "selected-day";
  };

  return (
    <DatePicker
      dayClassName={dayClassName}
      showIcon
      className={`custom-input ${
        inputError && !startDate ? "error-warning" : ""
      }`}
      id={id}
      calendarContainer={MyContainer}
      autoComplete="off"
      selected={startDate}
      showYearDropdown
      showMonthDropdown
      closeOnScroll={true}
      dropdownMode="select"
      onChange={(date) => setState(date)}
      {...(ageControl ? { minDate, maxDate } : null)}
    />
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  ageControl: PropTypes.bool,
  inputError: PropTypes.bool,
  state: PropTypes.instanceOf(Date),
  setState: PropTypes.func.isRequired,
};
