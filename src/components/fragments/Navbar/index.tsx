import { signIn, signOut } from 'next-auth/react';

const Navbar = ({ data }: any) => {
  return (
    <div className="w-full h-16 bg-color-dark">
      <div className="flex w-full justify-end items-center h-full px-5 gap-2">
        {data &&
          (!data?.user?.hasOwnProperty('fullname') ? (
            <p className="text-color-primary font-semibold text-xl">
              Hallo, <span className="font-bold text-color-blue">{data?.user?.name}</span>
            </p>
          ) : (
            <p className="text-color-primary font-semibold text-xl">
              Hallo, <span className="font-bold text-color-blue">{data?.user?.fullname}</span>
            </p>
          ))}

        <button
          className="bg-color-primary text-color-dark font-semibold py-1 px-3 rounded-md"
          onClick={() => (data ? signOut() : signIn())}
        >
          {data ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
