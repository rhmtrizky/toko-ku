import Button from '@/components/ui/Button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PropTypes = {
  title: string;
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};
const SideBar = (props: PropTypes) => {
  const { lists, title } = props;
  const { pathname } = useRouter();

  return (
    <div className="w-1/5 h-screen fixed bg-color-dark flex flex-col justify-between p-5">
      <div className="">
        <h1 className="text-color-primary font-semibold text-2xl">{title}</h1>
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
        label="Log Out"
        onClick={() => signOut()}
        className="bg-color-primary w-full text-color-dark font-semibold py-2 px-3 rounded-md text-sm"
      />
    </div>
  );
};

export default SideBar;
