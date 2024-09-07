import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForwardStep,
  faAngleRight,
  faAngleLeft,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import IconButton from "../iconButton/IconButton";
import "./pagination.scss";
import { colors } from "../../utils/variables-colors-typo";

/**
 * Custom Material Pagination component for managing pagination.
 * @module CustomMaterialPagination
 * @param {Object} props - The properties of the component.
 * @param {number} props.rowsPerPage - The number of rows per page.
 * @param {number} props.rowCount - The total number of rows.
 * @param {number} props.currentPage - The current page number.
 * @param {Function} props.onChangePage - The function to handle page change.
 * @param {Function} props.onChangeRowsPerPage - The function to handle rows per page change.
 * @returns {JSX.Element} The JSX element representing the custom material pagination.
 */

const CustomMaterialPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => {
  /**
   * Calculates the total number of pages based on row count and rows per page.
   * @param {number} count - The total number of rows.
   * @param {number} rowsPerPage - The number of rows per page.
   * @returns {number} The total number of pages.
   */

  const getNumberOfPages = (count, rowsPerPage) =>
    Math.ceil(count / rowsPerPage);

  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
  ];

  const handleRowsPerPageChange = (selectedOption) => {
    onChangeRowsPerPage(selectedOption.value);
  };
  const handleFirstPageButtonClick = () => {
    onChangePage(1);
  };

  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handleLastPageButtonClick = () => {
    onChangePage(getNumberOfPages(rowCount, rowsPerPage));
  };

  // Defines the styles for the options in the dropdown menu based on different states such as selection, hover, etc.
  const optionStyles = {
    option: (provided, { isDisabled, isFocused, isSelected }) => {
      const activeStyle = {
        backgroundColor: colors.primaryLight,
      };
      return {
        ...provided,
        cursor: "pointer",
        fontSize: "14px",
        backgroundColor: isDisabled
          ? "red"
          : isSelected
          ? "white"
          : isFocused
          ? colors.primary
          : undefined,
        color: isDisabled
          ? "white"
          : isSelected
          ? colors.primary
          : isFocused
          ? "white"
          : "black",
        ":active": isSelected ? undefined : activeStyle,
      };
    },
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
    }),
    control: (provided, { isFocused }) => ({
      ...provided,
      cursor: "pointer",
      borderColor: isFocused ? colors.primary : provided.borderColor,
      boxShadow: isFocused ? null : provided.boxShadow,
      "&:hover": {
        borderColor: isFocused
          ? colors.primary
          : provided["&:hover"].borderColor,
      },
    }),
    menuList: (provided) => ({
      ...provided,
      cursor: "pointer",
      padding: " 9px 0",
      borderRadius: "5px",
    }),
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles, fontSize: "14px" }),
    singleValue: (styles) => ({ ...styles, color: colors.secondary }),
  };

  return (
    <div className="pagination__wrapper">
      <div className="pagination__row-info">
        <label className="pagination__row-label" htmlFor="rowsPerPage">
          Rows per page:{" "}
        </label>
        <Select
          id="rowsPerPage"
          className="pagination__react-select"
          classNamePrefix="react-select-pagination"
          value={options.find((option) => option.value === rowsPerPage)}
          onChange={handleRowsPerPageChange}
          options={options}
          styles={optionStyles}
        />
      </div>
      <div>
        <span>
          {currentPage} - {Math.ceil(rowCount / rowsPerPage)}
        </span>
      </div>
      <div className="pagination__iconButton-container">
        <IconButton
          label="first page"
          onClick={handleFirstPageButtonClick}
          disabled={currentPage === 1}
          aria-label="first page">
          <FontAwesomeIcon
            icon={faBackwardStep}
            size="xl"
            className="pagination__icon"
          />
        </IconButton>
        <IconButton
          label="previous page"
          onClick={handleBackButtonClick}
          disabled={currentPage === 1}
          aria-label="previous page">
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="xl"
            className="pagination__icon"
          />
        </IconButton>
        <IconButton
          label="next page"
          onClick={handleNextButtonClick}
          disabled={currentPage === getNumberOfPages(rowCount, rowsPerPage)}
          aria-label="next page">
          <FontAwesomeIcon
            icon={faAngleRight}
            size="xl"
            className="pagination__icon"
          />
        </IconButton>
        <IconButton
          label="last page"
          onClick={handleLastPageButtonClick}
          disabled={currentPage === getNumberOfPages(rowCount, rowsPerPage)}
          aria-label="last page">
          <FontAwesomeIcon
            icon={faForwardStep}
            size="xl"
            className="pagination__icon"
          />
        </IconButton>
      </div>
    </div>
  );
};
CustomMaterialPagination.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};
export default CustomMaterialPagination;
