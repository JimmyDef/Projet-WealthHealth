import { useState } from "react";
import "./home.scss";
import CustomDatePicker from "./../components/DatePicker";
const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      firstName,
      lastName,
      dateOfBirth,
      // startDate,
      street,
      city,
      state,
      zipCode,
      department,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <section className="personal-section">
        <h2>Personal Information</h2>
        {/* Champ First Name */}
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {/* Champ Last Name */}
        <div className="input-wrapper">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {/* Champ Date of Birth */}
        <div className="input-wrapper">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        {/* Champ Start Date */}
        <div className="input-wrapper">
          <label htmlFor="startDate">Start Date:</label>
          <CustomDatePicker />
        </div>
      </section>
      <section className="adress-section">
        {/* Section Adresse */}
        <h2>Address Information</h2>
        {/* Champ Street */}
        <div className="input-wrapper">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        {/* Champ City */}
        <div className="input-wrapper">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        {/* Champ State */}
        <div className="input-wrapper">
          <label htmlFor="state">State:</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}>
            {/* Options pour le menu déroulant */}
            <option value="">Select State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
          </select>
        </div>
        {/* Champ Zip Code */}
        <div className="input-wrapper">
          <label htmlFor="zipCode">Zip Code:</label>
          <input
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
          <label htmlFor="state">Department:</label>
          <select
            id="department"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}>
            {/* Options pour le menu déroulant */}
            <option value="">Select Department</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
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
