import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps } from '@nextui-org/react';

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

type PropTypes = {
  data: any[];
  columns: any[];
  renderCellContent: (data: any, columnKey: React.Key) => React.ReactNode;
};

export default function TableNextUi(props: PropTypes) {
  const { data, columns, renderCellContent } = props;

  const renderCell = React.useCallback(
    (data: any, columnKey: React.Key) => {
      return renderCellContent(data, columnKey);
    },
    [renderCellContent]
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>{(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
    </Table>
  );
}
