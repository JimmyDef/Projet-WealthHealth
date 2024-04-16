import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import PropTypes from "prop-types";
import "./datePicker.scss";

const CustomDatePicker = ({ id, ageControl }) => {
  const [startDate, setStartDate] = useState(null);
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

  return (
    <DatePicker
      dayClassName={dayClassName}
      showIcon
      className="custom-input"
      id={id}
      calendarContainer={MyContainer}
      selected={startDate}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      onChange={(date) => setStartDate(date)}
      {...(ageControl ? { minDate, maxDate } : null)}
    />
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  id: PropTypes.string,
  ageControl: PropTypes.bool,
};
