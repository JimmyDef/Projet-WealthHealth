import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./datePicker.scss";

const CustomDatePicker = ({
  id,
  ageControl,
  inputError,
  state: startDate,
  setState,
}) => {
  const today = new Date();
  const minDate = new Date();
  const maxDate = new Date();

  minDate.setFullYear(today.getFullYear() - 80);
  maxDate.setFullYear(today.getFullYear() - 18);

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
