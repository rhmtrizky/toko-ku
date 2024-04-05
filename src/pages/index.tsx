import Navbar from '@/components/fragments/Navbar';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data }: any = useSession();
  return (
    <>
      <Navbar data={data} />
      <h1>HOME PAGE</h1>
      {/* <p>halo bang {data?.user.fullname}</p> */}
    </>
  );
}
