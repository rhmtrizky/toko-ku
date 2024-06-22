import { classNames } from 'primereact/utils';

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

const Input = (props: InputProps) => {
  const { label, type, name, placeholder, defaultValue, disabled, onChange, className } = props;
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="font-semibold"
      >
        {label}
      </label>
      <input
        className={className ? className : 'disabled:opacity-60 w-full border-color-input border-2  px-3 py-2 rounded-md bg-color-primary text-color-dark '}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange ? onChange : () => {}}
        style={{ outline: 'none' }}
      />
    </div>
  );
};

export default Input;
