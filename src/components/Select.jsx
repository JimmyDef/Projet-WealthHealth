import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import "./select.scss";
import React from "react";

import PropTypes from "prop-types";

const SelectDropdown = ({ selectorOptions, label, orientation }) => {
  const SelectItem = React.forwardRef(
    ({ children, className, ...props }, forwardedRef) => {
      return (
        <Select.Item
          className={classnames("SelectItem", className)}
          {...props}
          ref={forwardedRef}>
          <Select.ItemText>{children}</Select.ItemText>
          <Select.ItemIndicator className="SelectItemIndicator">
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      );
    }
  );

  SelectItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
  };
  SelectItem.displayName = "SelectItem";

  return (
    <Select.Root>
      <Select.Trigger className="SelectTrigger" aria-label="Food" id={label}>
        <Select.Value placeholder="- - -" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="SelectContent"
          position="popper"
          side={orientation}
          sideOffset={5}
          avoidCollisions={false}
          collisionPadding={30}>
          <Select.ScrollUpButton className="SelectScrollButton" asChild={false}>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              {selectorOptions.map((x) => {
                return (
                  <SelectItem key={x.name} value={x.abbreviation || x.name}>
                    {x.name}
                  </SelectItem>
                );
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
SelectDropdown.propTypes = {
  selectorOptions: PropTypes.array,
  label: PropTypes.string,
  orientation: PropTypes.string,
};
export default SelectDropdown;
