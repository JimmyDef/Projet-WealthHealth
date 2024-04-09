import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import PropTypes from "prop-types";
import "./datePicker.scss";
import { colors } from "../sass/variables-colors-typo";

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  const MyContainer = ({ className, children }) => {
    return (
      <div
        style={{
          padding: "10px",
          background: colors.secondary,
          color: "#fff",
        }}>
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
  return (
    <DatePicker
      className="custom-input"
      calendarContainer={MyContainer}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default CustomDatePicker;
