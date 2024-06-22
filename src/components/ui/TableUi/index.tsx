import { Table } from 'antd';

interface DataType {
  fullname: string;
  email: number;
  role: string;
}

type PropTypes = {
  data: DataType[];
  columns: any[];
};

const TableUi = (props: PropTypes) => {
  const { data, columns } = props;

  return (
    <Table
      columns={columns}
      dataSource={data}
    />
  );
};

export default TableUi;
