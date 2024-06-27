import Button from '@/components/ui/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PropTypes = {
  title?: string;
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
  closeIcon?: any;
  onClick?: () => void;
  bgColor: string;
};
const SideBar = (props: PropTypes) => {
  const { lists, title, closeIcon, onClick, bgColor } = props;
  const { pathname } = useRouter();
  const { status } = useSession();
  console.log(status);

  return (
    <div className={`lg:w-1/5 md:w-[50%] sm:w-[70%] w-[70%] h-screen fixed bg-color-${bgColor} flex flex-col justify-between p-5`}>
      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="text-color-primary font-semibold text-xl">{title}</h1>
          <button onClick={onClick}>
            <p className="text-color-primary text-2xl">{closeIcon}</p>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-7">
          {lists.map((item, index) => (
            <Link
              href={item.url}
              key={item.title}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm font-semibold hover:bg-color-primary hover:text-color-dark hover:ease-in-out hover:duration-300 ${pathname == item.url ? 'bg-color-primary text-color-dark' : 'text-color-primary'}`}
            >
              <i className={`bx ${item.icon} text-2xl`} />
              <h4>{item.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <Button
        label={status !== 'authenticated' ? `Log In` : `Log Out`}
        onClick={() => (status !== 'authenticated' ? signIn() : signOut())}
        className="bg-color-primary w-full text-color-dark font-semibold py-2 px-3 rounded-md text-sm"
      />
    </div>
  );
};

export default SideBar;
