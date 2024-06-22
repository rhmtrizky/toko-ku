import Image from 'next/image';

type ButtonProps = {
  icon?: string;
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  className: string;
  disabled: boolean;
};

const Button = (props: any) => {
  const { icon, label, type, onClick, className, disabled } = props;
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      <div>
        {icon && (
          <Image
            src={icon}
            alt="..."
            width={20}
            height={20}
          />
        )}
        <p>{label}</p>
      </div>
    </button>
  );
};

export default Button;
