import Select, { components } from "react-select";
import PropTypes from "prop-types";
import { ListFormatter } from "../../utils/dataFormatters";
import "./select.scss";
import { colors } from "../../utils/variables-colors-typo";

/**
 * Select component for user selection.
 * @param {Object} props - The props object.
 * @param {Object} props.state - The selected state.
 * @param {Function} props.setState - The state change handler.
 * @param {Array} props.options - The list of options.
 * @param {string} props.listName - The name of the option list.
 * @param {string} props.id - The id of the select input.
 * @param {boolean} [props.inputError] - Indicates if there's an input error.
 * @returns {JSX.Element} A select component.
 */

const SelectComponent = ({
  state,
  setState,
  options,
  listName,
  id,
  inputError,
}) => {
  const selectOptions = new ListFormatter(options, listName).getData();

  /**
   * Custom input component for the Select component.
   * @param {Object} props - The props object.
   * @returns {JSX.Element} A custom input component.
   */
  const CustomInput = (props) => {
    return <components.Input {...props} autoComplete="nope" />;
  };

  // Styles for customizing the appearance of options in the Select component.
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
      components={{ Input: CustomInput }}
    />
  );
};

SelectComponent.propTypes = {
  state: PropTypes.object,
  listName: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  inputError: PropTypes.bool,
};

export default SelectComponent;
