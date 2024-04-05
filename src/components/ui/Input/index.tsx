type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: InputProps) => {
  const { label, type, name, placeholder, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="font-semibold"
      >
        {label}
      </label>
      <input
        className="w-full border-2 border-color-gray px-3 py-2 rounded-md bg-color-input"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
