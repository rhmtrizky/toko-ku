import Link from 'next/link';

type PropTypes = {
  children: React.ReactNode;
  subChildren?: React.ReactNode;
  title?: string;
  link: string;
  linkText: string;
  linkTitle: string;
  isError: boolean;
  errorText?: string;
};

const AuthLayout = (props: PropTypes) => {
  const { children, title, link, linkText, isError, errorText, linkTitle, subChildren } = props;

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="w-96 flex flex-col gap-2 px-10 py-5 rounded-md shadow-2xl">
        <h1 className="flex justify-center font-bold text-2xl my-3">{title}</h1>
        <div>{children}</div>

        {isError && <p className="text-color-red text-sm italic">{errorText}</p>}
        <div className="flex gap-1 text-sm">
          <p>{linkText}</p>
          <Link href={link}>
            <p className="font-semibold text-color-blue italic">{linkTitle}</p>
          </Link>
        </div>

        {subChildren}
      </div>
    </div>
  );
};

export default AuthLayout;
