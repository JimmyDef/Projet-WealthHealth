import { useState, useEffect, useRef } from "react";
import "./home.scss";
import CustomDatePicker from "../components/datePicker/DatePicker";
import countryList from "./../assets/countryList.json";
import departmentList from "./../assets/departmentList.json";
import { useDispatch } from "react-redux";
import { addEmployeeInfos } from "./../redux/reducers";
import { v4 as uuidv4 } from "uuid";
import SelectComponent from "./../components/select-component/Select";
import {
  filterSpecialCharacters,
  filterNonAlphabeticCharacters,
  filterNonAlphanumericCharacters,
} from "../util/modules";
import Modal from "./../components/modal/Modal";
const Home = () => {
  const dispatch = useDispatch();
  const saveButtonRef = useRef(null);
  // const mainContentRef = useRef(null);
  const toFocusRef = useRef(null);
  /* ------------------------
  Gestion MODAL
--------------------------- */
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (isModalOpen) {
      console.log("🚀 ~ toFocusRef.current:", toFocusRef.current);
      toFocusRef.current?.focus();
      rootElement.setAttribute("aria-hidden", "true");
    } else {
      saveButtonRef.current?.focus();
      rootElement.setAttribute("aria-hidden", "false");
    }
  }, [isModalOpen]);
  // ------------------------------

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: undefined,
    startDate: undefined,
    street: "",
    city: "",
    stateUS: null,
    zipCode: "",
    department: null,
  });
  const [inputError, setInputError] = useState(false);

  const handleChange = (e, sanitizer) => {
    const { name, value } = e.target;
    const cleanedValue = sanitizer(value);
    setFormData({ ...formData, [name]: cleanedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeesInfo = {
      ...formData,
      dateOfBirth: formData.dateOfBirth.toLocaleDateString("fr"),
      startDate: formData.startDate.toLocaleDateString("fr"),
      id: uuidv4(),
      stateUS: formData.stateUS.value,
      department: formData.department.value,
    };

    dispatch(addEmployeeInfos(employeesInfo));
    console.log("🚀 ~ employeesInfo:", employeesInfo);
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
    setInputError(false);
    closeModal();
  };

  return (
    <>
      <form
        aria-hidden="true"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            Object.values(formData).some(
              (value) => value === "" || value === undefined
            )
          ) {
            setInputError(true);
            return;
          }
          openModal();
        }}
        className="create-form">
        <section className="personal-section">
          <h2>Personal Information</h2>
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              autoComplete="off"
              className={`input-fields ${
                inputError && !formData.firstName ? "error-warning" : ""
              }`}
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e, filterNonAlphabeticCharacters)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              className={`input-fields ${
                inputError && !formData.lastName ? "error-warning" : ""
              }`}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e, filterNonAlphabeticCharacters)}
              autoComplete="off"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <CustomDatePicker
              id="dateOfBirth"
              ageControl={true}
              inputError={inputError}
              state={formData.dateOfBirth}
              setState={(date) =>
                setFormData({ ...formData, dateOfBirth: date })
              }
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="startDate">Start Date</label>
            <CustomDatePicker
              id="startDate"
              ageControl={false}
              inputError={inputError}
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
                inputError && !formData.street ? "error-warning" : ""
              }`}
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={(e) => handleChange(e, filterNonAlphanumericCharacters)}
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
                inputError && !formData.city ? "error-warning" : ""
              }`}
              value={formData.city}
              onChange={(e) => handleChange(e, filterNonAlphabeticCharacters)}
              autoComplete="off"
            />
          </div>
          <div className="input-wrapper" id="state-wrapper">
            <label htmlFor="stateUS">State</label>
            <SelectComponent
              inputError={inputError}
              listTitle="countryList"
              id="stateUS"
              options={countryList}
              state={formData.stateUS}
              setState={(value) => setFormData({ ...formData, stateUS: value })}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              className={`input-fields ${
                inputError && !formData.zipCode ? "error-warning" : ""
              }`}
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleChange(e, filterSpecialCharacters)}
              autoComplete="off"
            />
          </div>
        </section>
        <section className="department-section">
          <h2>Job Information</h2>

          <div className="input-wrapper" id="departement-wrapper">
            <label htmlFor="department">Department</label>
            <SelectComponent
              inputError={inputError}
              listTitle="departmentList"
              id="department"
              options={departmentList}
              state={formData.department}
              setState={(value) =>
                setFormData({ ...formData, department: value })
              }
            />
          </div>
        </section>

        <button
          type="submit"
          className="submit-btn"
          tabIndex={0}
          ref={saveButtonRef}>
          Save
        </button>
      </form>
      <Modal
        title="Infos confirmation"
        onClose={() => closeModal()}
        onConfirm={(e) => handleSubmit(e)}
        isOpen={isModalOpen}
        toFocusRef={toFocusRef}
      />
    </>
  );
};

export default Home;
