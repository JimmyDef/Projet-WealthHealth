import "./employeeDB.scss";

/**
 * EmployeeDB is a React component that displays the current employees.
 * It includes a header and a data table of employees with features like search engine and pagination menu.
 *
 * @returns {JSX.Element} The JSX rendered output of the EmployeeDB component.
 */

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
