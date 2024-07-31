import { useMemo } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

export type Option = {
  value: string;
  label: string;
};

type MultiSelectDropdownProps = {
  options: string[] | Option[];
  placeholder: string;
  onChange: (selectedOptions: Option[] | null) => void;
  value: Option[] | null;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  name: string
};

const animatedComponents = makeAnimated();

export const MultiSelectDropdown = ({
  options,
  placeholder,
  onChange,
  value,
  name
}: MultiSelectDropdownProps) => {
  const memoizedOptions = useMemo(() => {
    if (typeof options[0] === "string") {
      return (options as string[]).map(option => ({ value: option, label: option }));
    } else {
      return options as Option[];
    }
  }, [options]);

  const handleSelectionChange = (newValue: MultiValue<Option>) => {
    onChange(newValue as Option[]);
  };
  return (
    <Select
      isMulti
      value={value}
      onChange={handleSelectionChange}
      options={memoizedOptions}
      placeholder={placeholder}
      components={animatedComponents}
      closeMenuOnSelect={false}
      name={name}
    />
  );
};
