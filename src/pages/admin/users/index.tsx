import UsersAdminView from '@/components/views/admin/Users';
import userService from '@/services/user';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type PropTypes = {
  setToaster: any;
};

const PageAdminUsers = (props: PropTypes) => {
  const { setToaster } = props;
  const [users, setUsers] = useState([]);
  const session: any = useSession();
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userService.getAllUsers(session.data?.accessToken);
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <UsersAdminView
      setToaster={setToaster}
      users={users}
    />
  );
};

export default PageAdminUsers;
