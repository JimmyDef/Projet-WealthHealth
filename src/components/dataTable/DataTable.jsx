import { StyleSheetManager } from "styled-components";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter, copyToClipboard } from "../../utils/modules";
import { useEffect, useRef, useState } from "react";
import "./dataTable.scss";
import TextField from "../searchInput/TextField";
import { Tooltip } from "react-tooltip";
import countryList from "../../assets/countryList.json";
import CustomMaterialPagination from "./../pagination/Pagination";
import Modal from "../modal/Modal";

const EmployeesDataTable = () => {
  const employeesInfo = useSelector((state) => state.employees);
  const [employeesList, setEmployeesList] = useState(employeesInfo);
  const [personalRecord, setPersonalRecord] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const focusRef = useRef(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchTemLower = search.toLocaleLowerCase();
    const filtered = employeesInfo.filter((employee) =>
      Object.values(employee).some((value) =>
        value.toLocaleLowerCase().includes(searchTemLower)
      )
    );
    setEmployeesList(filtered);
  }, [search, employeesInfo]);

  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (isModalOpen) {
      rootElement.setAttribute("aria-hidden", "true");
      rootElement.classList.add("modal-open");
      focusRef.current?.focus();
    } else {
      rootElement.setAttribute("aria-hidden", "false");
      rootElement.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      format: (row) => capitalizeFirstLetter(row.firstName),
      width: "107px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
      format: (row) => capitalizeFirstLetter(row.lastName),
      width: "108px",
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      width: "113px",
      cell: (row) => (
        <div
          onClick={() => handleClickOnRow(row)}
          className="street-tooltip"
          data-tooltip-content={row.department}
          data-tooltip-id={`tooltip-${row.id}`}>
          {row.department}

          <Tooltip id={`tooltip-${row.id}`} interactive={true} />
        </div>
      ),
    },
    {
      name: "Date of Birth",
      selector: (row) => row.dateOfBirth,
      sortable: true,
      width: "117px",
    },
    {
      name: "Street",
      selector: (row) => row.street,
      sortable: true,
      cell: (row) => (
        <div
          onClick={() => handleClickOnRow(row)}
          className="street-tooltip"
          data-tooltip-content={row.street}
          data-tooltip-id={`tooltip-${row.id}`}>
          {row.street}

          <Tooltip id={`tooltip-${row.id}`} interactive={true} />
        </div>
      ),
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      format: (row) => capitalizeFirstLetter(row.city),
      cell: (row) => (
        <div
          onClick={() => handleClickOnRow(row)}
          className="street-tooltip"
          data-tooltip-content={row.city}
          data-tooltip-id={`tooltip-${row.id}`}>
          {row.city}

          <Tooltip id={`tooltip-${row.id}`} interactive={true} />
        </div>
      ),
    },
    {
      name: "State",
      selector: (row) => row.stateUS,
      sortable: true,
      width: "77px",
    },
    {
      name: "Zip Code",
      selector: (row) => row.zipCode,
      sortable: true,
      width: "100px",
    },
  ];
  const handleClickOnRow = (row) => {
    const stateFullName = countryList.find(
      (state) => state.abbreviation === row.stateUS
    );
    const rowInformation = `${row.firstName} ${row.lastName}, ${row.street}, ${row.city}, ${stateFullName.name} ${row.zipCode}. `;

    setPersonalRecord(rowInformation);
    copyToClipboard(rowInformation);
    setIsModalOpen(true);
  };
  const subHeaderComponent = (
    <div className="subHeaderComponent">
      <TextField search={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );

  // React data-table-component  actually create a <header> balise in the html by subHeaderComponent"

  return (
    <>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "align"}>
        <DataTable
          columns={columns}
          data={employeesList}
          dense
          highlightOnHover
          pagination
          subHeader={true}
          subHeaderAlign="right"
          subHeaderComponent={subHeaderComponent}
          keyField="id"
          onRowClicked={handleClickOnRow}
          paginationComponent={CustomMaterialPagination}
        />
        <Tooltip effect="solid" />
      </StyleSheetManager>
      {isModalOpen ? (
        <Modal
          title="Personal record"
          isOpen={isModalOpen}
          onClose={closeModal}
          showCloseButton>
          <p className="modal__text">{personalRecord}</p>
        </Modal>
      ) : null}
    </>
  );
};

export default EmployeesDataTable;
