import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./datePicker.scss";

const CustomDatePicker = ({
  id,
  ageControl,
  emptyInputError,
  state: startDate,
  setState,
  setIsDatePickerOpen: setIsOpen,
  isDatePickerOpen: isOpen,
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
    className: PropTypes.string,
    children: PropTypes.array,
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
  const handleDateChange = (date) => {
    setState(date);
    setIsOpen(false);
  };
  return (
    <DatePicker
      dayClassName={dayClassName}
      showIcon
      className={`custom-input ${
        emptyInputError && !startDate ? "error-warning" : ""
      }`}
      id={id}
      calendarContainer={MyContainer}
      autoComplete="off"
      selected={startDate}
      showYearDropdown
      showMonthDropdown
      closeOnScroll={true}
      dropdownMode="select"
      onChange={handleDateChange}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      open={isOpen}
      {...(ageControl ? { minDate, maxDate } : null)}
    />
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  id: PropTypes.string,
  ageControl: PropTypes.bool,
  emptyInputError: PropTypes.bool,
  state: PropTypes.instanceOf(Date),
  setState: PropTypes.func,
  isDatePickerOpen: PropTypes.bool,
  setIsDatePickerOpen: PropTypes.func,
};
