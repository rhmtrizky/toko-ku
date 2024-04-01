import UsersManagementTable from '@/components/fragments/Tables/UserTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import userService from '@/services/user';
import { useEffect, useState } from 'react';

const UsersAdminView = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userService.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-5">Users Management</h1>
      <div>
        <UsersManagementTable users={users} />
      </div>
    </AdminLayout>
  );
};

export default UsersAdminView;
