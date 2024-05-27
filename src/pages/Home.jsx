/**
 * Home Component for managing employee information.
 * @module Home
 */

import { useState } from "react";
import "./home.scss";
import CustomDatePicker from "../components/datePicker/DatePicker";
import countryList from "./../assets/countryList.json";
import departmentList from "./../assets/departmentList.json";
import { useDispatch } from "react-redux";
import { addEmployeeInfos } from "./../redux/reducers";
import { v4 as uuidv4 } from "uuid";
import SelectComponent from "./../components/select-component/Select";
import {
  removeSpecialCharacters,
  removeNonAlphabeticCharacters,
  removeNonAlphanumericCharacters,
} from "../utils/modules";
import Modal from "./../components/modal/Modal";

/**
 * Home Component to manage employee information.
 * @returns {JSX.Element} Returns the JSX of the Home component.
 */
const Home = () => {
  const dispatch = useDispatch();

  /**
   * State for managing form data.
   * @type {Object}
   * @property {string} firstName - First name of the employee.
   * @property {string} lastName - Last name of the employee.
   * @property {Date | undefined} dateOfBirth - Date of birth of the employee.
   * @property {Date | undefined} startDate - Start date of the employee.
   * @property {string} street - Street address of the employee.
   * @property {string} city - City of the employee.
   * @property {Object | null} stateUS - State of the employee (US).
   * @property {string} zipCode - Zip code of the employee.
   * @property {Object | null} department - Department of the employee.
   */
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

  /**
   * State for managing input error.
   * @type {boolean}
   */
  const [inputError, setInputError] = useState(false);

  /**
   * State for managing modal open/close status.
   * @type {boolean}
   */
  const [isModalOpen, setModalOpen] = useState(false);

  /**
   * Opens the modal.
   * @returns {void}
   */
  const openModal = () => setModalOpen(true);

  /**
   * Closes the modal.
   * @returns {void}
   */
  const closeModal = () => setModalOpen(false);

  /**
   * Handles form input change.
   * @param {Event} e - The input change event.
   * @param {Function} sanitizer - The function to sanitize input.
   * @returns {void}
   */
  const handleChange = (e, sanitizer) => {
    const { name, value } = e.target;
    const cleanedValue = sanitizer(value);
    setFormData({ ...formData, [name]: cleanedValue });
  };

  /**
   * Handles confirmation of form submission.
   * @param {Event} e - The form submission event.
   * @returns {void}
   */
  const handleConfirmation = (e) => {
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
    setFormData({
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
    setInputError(false);
    closeModal();
  };

  /**
   * Handles form submission.
   * @param {Event} e - The form submission event.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = (value) =>
      value === "" || value === undefined || value === null;
    const hasEmptyField = Object.values(formData).some(isEmpty);
    if (hasEmptyField) return setInputError(true);
    setInputError(false);
    openModal();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form form--create"
        autoComplete="offddzeze">
        <section className="form__section form__section--personal">
          <h2 className="form__section-title">Personal Information</h2>
          <div className="form__input-wrapper">
            <label htmlFor="firstName" className="form__label">
              First Name
            </label>
            <input
              autoComplete="nope"
              className={`form__input ${
                inputError && !formData.firstName ? "form__input--error" : ""
              }`}
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e, removeNonAlphabeticCharacters)}
            />
          </div>
          <div className="form__input-wrapper">
            <label htmlFor="lastName" className="form__label">
              Last Name
            </label>
            <input
              autoComplete="nope"
              className={`form__input ${
                inputError && !formData.lastName ? "form__input--error" : ""
              }`}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e, removeNonAlphabeticCharacters)}
            />
          </div>
          <div className="form__input-wrapper">
            <label htmlFor="dateOfBirth" className="form__label">
              Date of Birth
            </label>
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
          <div className="form__input-wrapper">
            <label htmlFor="startDate" className="form__label">
              Start Date
            </label>
            <CustomDatePicker
              id="startDate"
              ageControl={false}
              inputError={inputError}
              state={formData.startDate}
              setState={(date) => setFormData({ ...formData, startDate: date })}
            />
          </div>
        </section>
        <section className="form__section form__section--address">
          <h2 className="form__section-title">Address Information</h2>
          <div className="form__input-wrapper">
            <label htmlFor="street" className="form__label">
              Street
            </label>
            <input
              autoComplete="nope"
              className={`form__input ${
                inputError && !formData.street ? "form__input--error" : ""
              }`}
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={(e) => handleChange(e, removeNonAlphanumericCharacters)}
            />
          </div>
          <div className="form__input-wrapper">
            <label htmlFor="city" className="form__label">
              City
            </label>
            <input
              autoComplete="nope"
              type="text"
              id="city"
              name="city"
              className={`form__input ${
                inputError && !formData.city ? "form__input--error" : ""
              }`}
              value={formData.city}
              onChange={(e) => handleChange(e, removeNonAlphabeticCharacters)}
            />
          </div>
          <div className="form__input-wrapper" id="state-wrapper">
            <label htmlFor="stateUS" className="form__label">
              State
            </label>
            <SelectComponent
              inputError={inputError}
              listTitle="countryList"
              id="stateUS"
              options={countryList}
              state={formData.stateUS}
              setState={(value) => setFormData({ ...formData, stateUS: value })}
            />
          </div>
          <div className="form__input-wrapper">
            <label htmlFor="zipCode" className="form__label">
              Zip Code
            </label>
            <input
              autoComplete="nope"
              className={`form__input ${
                inputError && !formData.zipCode ? "form__input--error" : ""
              }`}
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleChange(e, removeSpecialCharacters)}
            />
          </div>
        </section>
        <section className="form__section form__section--department">
          <h2 className="form__section-title">Job Information</h2>
          <div className="form__input-wrapper" id="department-wrapper">
            <label htmlFor="department" className="form__label">
              Department
            </label>
            <SelectComponent
              autoComplete="nope"
              inputError={inputError}
              listTitle="departmentList"
              id="department"
              options={departmentList}
              state={formData.department}
              setState={(value) => {
                setFormData({ ...formData, department: value });
              }}
            />
          </div>
        </section>

        <div className="form__actions">
          <button
            role="button"
            type="submit"
            onClick={handleSubmit}
            onFocus={closeModal}
            className="form__submit-btn"
            tabIndex={0}>
            Save
          </button>
          {inputError && (
            <p
              role="alert"
              aria-live="assertive"
              className={`form__error-message ${
                inputError ? "form__error-message--visible" : ""
              }`}>
              Please fill in all the fields.
            </p>
          )}
        </div>
      </form>

      <Modal
        title="Infos confirmation"
        onClose={closeModal}
        onConfirmClick={handleConfirmation}
        isOpen={isModalOpen}>
        <p>
          Employee:{" "}
          <span className="modal__informations">
            {formData?.firstName} {formData?.lastName}
          </span>
        </p>
        <p>
          Birthdate:{" "}
          {formData?.dateOfBirth ? (
            <span className="modal__informations">
              {formData.dateOfBirth.toLocaleDateString("fr")}
            </span>
          ) : (
            ""
          )}
        </p>
        <div>
          <p className="modal__informations--adress">Adress:</p>{" "}
          <span className="modal__informations">
            {formData?.street}, {formData?.city},{" "}
            {formData?.stateUS ? formData.stateUS.label : ""},{" "}
            {formData?.zipCode}
          </span>
        </div>

        <p>
          Department:{" "}
          <span className="modal__informations">
            {formData?.department ? formData.department.value : ""}
          </span>{" "}
        </p>
        <p>
          Start date:{" "}
          <span className="modal__informations">
            {formData?.startDate ? (
              <span className="modal__informations">
                {formData.startDate.toLocaleDateString("fr")}
              </span>
            ) : (
              ""
            )}
          </span>
        </p>
      </Modal>
    </>
  );
};

export default Home;
