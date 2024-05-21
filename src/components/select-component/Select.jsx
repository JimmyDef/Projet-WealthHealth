import Select from "react-select";
import PropTypes from "prop-types";
import { ListFormatter } from "./../../util/dataFormatters";
import "./select.scss";
import { colors } from "../../util/variables-colors-typo";

const SelectComponent = ({
  state,
  setState,
  options,
  listTitle,
  id,
  inputError,
}) => {
  const selectOptions = new ListFormatter(options, listTitle).getData();
  const optionStyles = {
    option: (provided, { isDisabled, isFocused, isSelected }) => {
      const activeStyle = {
        backgroundColor: colors.primaryLight, // Changez cette couleur à votre convenance
      };
      return {
        ...provided,
        cursor: "pointer",
        fontSize: "14px",
        backgroundColor: isDisabled
          ? undefined
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

  return (
    <Select
      menuPortalTarget={document.body}
      menuPosition="fixed"
      menuPlacement="auto"
      inputId={id}
      value={state}
      onChange={setState}
      options={selectOptions}
      className={`react-select-container ${
        inputError && !state ? "error-warning" : ""
      }`}
      classNamePrefix="react-select"
      styles={optionStyles}
    />
  );
};

SelectComponent.propTypes = {
  state: PropTypes.object,
  listTitle: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  inputError: PropTypes.bool,
};

export default SelectComponent;
