import React from 'react';
import UsersAdminView from '@/components/views/admin/Users';
import userService from '@/services/user';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const PageAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const session: any = useSession();
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userService.getAllUsers(session.data?.accessToken);
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return <UsersAdminView users={users} />;
};

export default PageAdminUsers;
