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

  const getAllUsers = async () => {
    try {
      if (session.data.accessToken) {
        const { data } = await userService.getAllUsers(session.data?.accessToken);
        setUsers(data.data);
      } else {
        console.error('Access token is not available');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      getAllUsers();
    }
  }, [session.status]);
  return (
    <UsersAdminView
      setToaster={setToaster}
      users={users}
    />
  );
};

export default PageAdminUsers;
