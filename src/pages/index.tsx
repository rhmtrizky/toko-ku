import Navbar from '@/components/layouts/Navbar';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <Navbar data={data} />
      <h1>HOME PAGE</h1>
      <p>halo bang {data?.user?.name}</p>
    </>
  );
}
