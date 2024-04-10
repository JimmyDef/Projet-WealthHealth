import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import PropTypes from "prop-types";
import "./datePicker.scss";

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const today = new Date();
  const MyContainer = ({ className, children }) => {
    return (
      <div className="pop-up-wrapper">
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
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
      calendarContainer={MyContainer}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default CustomDatePicker;
