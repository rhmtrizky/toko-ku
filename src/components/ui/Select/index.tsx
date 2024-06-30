import { Select, SelectItem } from '@nextui-org/react';
import { useEffect } from 'react';

type Options = {
  label: string;
  value: string;
};

type PropTypes = {
  label: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Options[];
};

const SelectUi = (props: PropTypes) => {
  const { label, name, defaultValue, options, disabled } = props;

  return (
    <Select
      name={name}
      defaultSelectedKeys={defaultValue ? [defaultValue] : undefined}
      labelPlacement={'inside'}
      label={label}
      disabled={disabled}
      required
    >
      {options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectUi;
