type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
};

const Input = (props: InputProps) => {
  const { label, type, name, placeholder } = props;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        className="w-full border-2 border-color-gray px-2 py-1 rounded-md"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
