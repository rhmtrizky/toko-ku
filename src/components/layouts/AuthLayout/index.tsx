import CarouselUi from '@/components/ui/Carousel';
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
    <div className="flex w-full h-screen lg:justify-between md:justify-between sm:justify-center justify-center items-center bg-color-pink">
      <div className="lg:w-1/2 md:w-1/2 sm:w-full flex lg:justify-start md:justify-start sm:justify-center justify-center items-center">
        <div className="lg:w-96 md:w-96 sm:w-80 w-full flex flex-col gap-2 px-10 py-5 rounded-md lg:ml-20 md:ml-20 sm:ml-0 ml-0 ">
          <h1 className="flex justify-center font-bold text-3xl my-3 text-color-primary">{title}</h1>
          <div>{children}</div>

          {isError && <p className="text-color-red text-sm italic">{errorText}</p>}
          <div className="flex gap-1 text-sm mt-2">
            <p className="font-normal text-color-primary">{linkText}</p>
            <Link href={link}>
              <p className="font-bold text-color-primary">{linkTitle}</p>
            </Link>
          </div>

          {subChildren}
        </div>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center pr-10 lg:flex md:flex sm:hidden hidden ">
        <div className="h-[90vh] w-full bg-color-primary rounded-lg">{/* <CarouselUi /> */}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
