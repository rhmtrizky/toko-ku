import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
import TableUi from '@/components/ui/TableUi';
import { Space } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';

type PropTypes = {
  users: any[];
};

const UsersAdminView = (props: PropTypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState<any>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  const columns = [
    {
      title: 'No.',
      key: 'No.',
      render: (_: any, user: any, index: any) => <p>{index + 1}</p>,
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, user: any) => (
        <Space size="middle">
          <Button
            label="Update"
            type="button"
            className="bg-color-blue text-color-primary py-1 px-3 rounded-md font-semibold"
            onClick={() => setUpdatedUser(user)}
          />
          <Button
            label="Delete"
            type="button"
            className="bg-color-red text-color-primary py-1 px-3 rounded-md font-semibold"
            onClick={() => setDeletedUser(user)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5">Users Management</h1>
        <div>
          <TableUi
            data={usersData}
            columns={columns}
          />
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default UsersAdminView;
