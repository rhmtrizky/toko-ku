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
  className: string;
};

const Select = (props: PropTypes) => {
  const { label, name, defaultValue, options, className } = props;
  return (
    <div>
      <label
        htmlFor={name}
        className="font-semibold"
      >
        {label}
      </label>
      <select
        name={name}
        className={className}
        id={name}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <option
            key={option.label}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
