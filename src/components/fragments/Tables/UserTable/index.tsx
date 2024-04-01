import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import Button from '@/components/ui/Button';

interface DataType {
  fullname: string;
  email: number;
  role: string;
}

type PropTypes = {
  users: DataType[];
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'No.',
    key: 'No.',
    render: (_, users, index) => <a>{index + 1}</a>,
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
    render: () => (
      <Space size="middle">
        <Button
          label="Update"
          type="button"
          className="bg-color-blue text-color-primary py-1 px-3 rounded-md font-semibold"
        />
        <Button
          label="Delete"
          type="button"
          className="bg-color-red text-color-primary py-1 px-3 rounded-md font-semibold"
        />
      </Space>
    ),
  },
];

const UsersManagementTable = (props: PropTypes) => {
  const { users } = props;
  return (
    <Table
      columns={columns}
      dataSource={users}
    />
  );
};

export default UsersManagementTable;
