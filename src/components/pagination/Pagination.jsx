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
import { colors } from "../../util/variables-colors-typo";

const CustomMaterialPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => {
  const getNumberOfPages = (count, rowsPerPage) =>
    Math.ceil(count / rowsPerPage);
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
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
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
