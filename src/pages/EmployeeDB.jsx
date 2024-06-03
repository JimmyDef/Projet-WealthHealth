import "./employeeDB.scss";
import { Suspense, lazy } from "react";

const LazyEmployeesDataTable = lazy(() =>
  import("../components/dataTable/DataTable")
);

const EmployeeDB = () => {
  return (
    <div className="table-container">
      <h2 className="header-title"> Current Employees </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyEmployeesDataTable />
      </Suspense>
    </div>
  );
};

export default EmployeeDB;
