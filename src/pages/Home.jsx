import { useState } from "react";
import "./home.scss";
import CustomDatePicker from "../components/datePicker/DatePicker";
import SelectDropdown from "../components/selector/Select";
import countriesList from "./../assets/countriesList.json";
import departmentsList from "./../assets/departmentsList.json";
import { useDispatch } from "react-redux";
import { addEmployeeInfos } from "./../redux/reducers";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: undefined,
    startDate: undefined,
    street: "",
    city: "",
    stateUS: "",
    zipCode: "",
    department: "",
  });
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [isBirthDatePickerOpen, setIsBirthDatePickerOpen] = useState(false);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(formData).some(
        (value) => value === "" || value === undefined
      )
    ) {
      setEmptyInputError(true);
      return;
    }

    const employeesInfo = {
      ...formData,
      dateOfBirth: formData.dateOfBirth.toLocaleDateString("fr"),
      startDate: formData.startDate.toLocaleDateString("fr"),
      id: uuidv4(),
    };

    dispatch(addEmployeeInfos(employeesInfo));
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      startDate: undefined,
      street: "",
      city: "",
      stateUS: "",
      zipCode: "",
      department: "",
    });
    setEmptyInputError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <section className="personal-section">
        <h2>Personal Information</h2>
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name</label>
          <input
            autoComplete="off"
            className={`input-fields ${
              emptyInputError && !formData.firstName ? "error-warning" : ""
            }`}
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Last Name</label>
          <input
            className={`input-fields ${
              emptyInputError && !formData.lastName ? "error-warning" : ""
            }`}
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <CustomDatePicker
            isDatePickerOpen={isBirthDatePickerOpen}
            setIsDatePickerOpen={setIsBirthDatePickerOpen}
            id="dateOfBirth"
            ageControl={true}
            emptyInputError={emptyInputError}
            state={formData.dateOfBirth}
            setState={(date) => setFormData({ ...formData, dateOfBirth: date })}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="startDate">Start Date</label>
          <CustomDatePicker
            isDatePickerOpen={isStartDatePickerOpen}
            setIsDatePickerOpen={setIsStartDatePickerOpen}
            id="startDate"
            ageControl={false}
            emptyInputError={emptyInputError}
            state={formData.startDate}
            setState={(date) => setFormData({ ...formData, startDate: date })}
          />
        </div>
      </section>
      <section className="adress-section">
        <h2>Address Information</h2>
        <div className="input-wrapper">
          <label htmlFor="street">Street</label>
          <input
            className={`input-fields ${
              emptyInputError && !formData.street ? "error-warning" : ""
            }`}
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className={`input-fields ${
              emptyInputError && !formData.city ? "error-warning" : ""
            }`}
            value={formData.city}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="input-wrapper" id="state-wrapper">
          <label htmlFor="stateUS">State</label>
          <SelectDropdown
            setIsStartDatePickerOpen={setIsStartDatePickerOpen}
            setIsBirthDatePickerOpen={setIsBirthDatePickerOpen}
            selectorOptions={countriesList}
            label="stateUS"
            orientation="bottom"
            emptyInputError={emptyInputError}
            state={formData.stateUS}
            setState={(value) => setFormData({ ...formData, stateUS: value })}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            className={`input-fields ${
              emptyInputError && !formData.zipCode ? "error-warning" : ""
            }`}
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </section>
      <section className="department-section">
        <h2>Job Information</h2>
        <div className="input-wrapper" id="departement-wrapper">
          <label htmlFor="department">Department</label>
          <SelectDropdown
            setIsStartDatePickerOpen={setIsStartDatePickerOpen}
            setIsBirthDatePickerOpen={setIsBirthDatePickerOpen}
            selectorOptions={departmentsList}
            label="department"
            orientation="bottom"
            emptyInputError={emptyInputError}
            state={formData.department}
            setState={(value) =>
              setFormData({ ...formData, department: value })
            }
          />
        </div>
      </section>

      <button type="submit" className="submit-btn" tabIndex={0}>
        Save
      </button>
    </form>
  );
};

export default Home;
