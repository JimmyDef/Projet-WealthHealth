import { useState } from "react";
import "./home.scss";
import CustomDatePicker from "./../components/DatePicker";
import SelectDropdown from "../components/Select";
import countriesList from "./../assets/countriesList.json";
import departmentsList from "./../assets/departmentsList.json";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  // const [stateUS, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  // const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      firstName,
      lastName,
      // dateOfBirth,
      // startDate,
      street,
      city,
      // stateUS,
      zipCode,
      // department,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <section className="personal-section">
        <h2>Personal Information</h2>
        {/* Champ First Name */}
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name</label>
          <input
            className="input-fields"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {/* Champ Last Name */}
        <div className="input-wrapper">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="input-fields"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {/* Champ Date of Birth */}
        <div className="input-wrapper">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <CustomDatePicker id="dateOfBirth" ageControl={true} />
        </div>
        {/* Champ Start Date */}
        <div className="input-wrapper">
          <label htmlFor="startDate">Start Date</label>
          <CustomDatePicker id="startDate" ageControl={false} />
        </div>
      </section>
      <section className="adress-section">
        {/* Section Adresse */}
        <h2>Address Information</h2>
        {/* Champ Street */}
        <div className="input-wrapper">
          <label htmlFor="street">Street</label>
          <input
            className="input-fields "
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        {/* Champ City */}
        <div className="input-wrapper">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            className="input-fields "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        {/* Champ State */}
        <div className="input-wrapper" id="state-wrapper">
          <label htmlFor="statesList">State</label>
          <SelectDropdown
            selectorOptions={countriesList}
            label="statesList"
            orientation="bottom"
          />
        </div>
        {/* Champ Zip Code */}
        <div className="input-wrapper">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            className="input-fields "
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </section>
      <section className="department-section">
        {/* Section departement */}
        <h2>Job Information</h2>
        <div className="input-wrapper">
          <label htmlFor="departmentsList">Department</label>
          <SelectDropdown
            selectorOptions={departmentsList}
            label="departmentsList"
            orientation="top"
          />
        </div>
      </section>

      {/* Bouton de soumission du formulaire */}
      <button type="submit" className="submit-btn">
        Save
      </button>
    </form>
  );
};

export default Home;
