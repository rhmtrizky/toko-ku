import { Input } from '@nextui-org/react';

type InputProps = {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  className?: string;
};

const InputUi = (props: InputProps) => {
  const { label, type, name, placeholder, defaultValue, disabled, onChange } = props;

  return (
    <Input
      key={'inside'}
      labelPlacement={'inside'}
      type={type}
      name={name}
      label={label ? label : placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      style={{ outline: 'none', backgroundColor: 'transparent' }}
    />
  );
};

export default InputUi;
