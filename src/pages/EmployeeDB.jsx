import "./employeeDB.scss";
// import PropTypes from "prop-types";

import EmployeesDataTable from "../components/dataTable/DataTable";
const EmployeeDB = () => {
  return (
    <div className="table-container">
      <h2 className="header-title"> Current Employees </h2>
      <EmployeesDataTable />
    </div>
  );
};

export default EmployeeDB;
