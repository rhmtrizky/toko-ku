import Navbar from '@/components/fragments/Navbar';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data }: any = useSession();
  return (
    <>
      <Navbar data={data} />
      <h1>HOME PAGE dfdf</h1>
      {/* <p>halo bang {data?.user.fullname}</p> */}
    </>
  );
}
