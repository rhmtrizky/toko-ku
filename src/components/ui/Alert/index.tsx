import React from 'react';
import { Alert, Space } from 'antd';
type PropTypes = {
  message: string;
  type: any;
};

const AlertUi: React.FC<PropTypes> = (props) => {
  const { message, type } = props;
  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
    >
      <Alert
        message={message}
        type={type}
        showIcon
      />
    </Space>
  );
};

export default AlertUi;
