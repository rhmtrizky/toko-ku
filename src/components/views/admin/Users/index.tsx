import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableNextUi from '@/components/ui/TableNextUi';

type PropTypes = {
  users: any[];
  setToaster: any;
};

const UsersAdminView = (props: PropTypes) => {
  const { users, setToaster } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState<any>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  const columns = [
    {
      title: 'No.',
      uid: 'index',
    },
    {
      title: 'Fullname',
      uid: 'fullname',
    },
    {
      title: 'Email',
      uid: 'email',
    },
    {
      title: 'Role',
      uid: 'role',
    },
    {
      title: 'Actions',
      uid: 'actions',
    },
  ];

  const renderCellContent = (data: any, columnKey: any) => {
    switch (columnKey) {
      case 'index': {
        return <p>{data.index + 1}</p>;
      }
      case 'actions':
        return (
          <div className="flex gap-2 justify-center items-center">
            <Button
              label="Update"
              type="button"
              className="bg-color-blue text-color-primary py-1 px-3 rounded-md font-semibold"
              onClick={() => setUpdatedUser(data)}
            />
            <Button
              label="Delete"
              type="button"
              className="bg-color-red text-color-primary py-1 px-3 rounded-md font-semibold"
              onClick={() => setDeletedUser(data)}
            />
          </div>
        );
      default:
        return data[columnKey];
    }
  };

  const processedData = usersData.map((user: any, index: any) => ({ ...user, index }));

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5">Users Management</h1>
        <div>
          <TableNextUi
            data={processedData}
            columns={columns}
            renderCellContent={renderCellContent}
          />
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
          setToaster={setToaster}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default UsersAdminView;
