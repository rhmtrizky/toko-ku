import React from 'react';
import { Alert, Space } from 'antd';
type PropTypes = {
  message: string;
};

const AlertUi: React.FC<PropTypes> = (props) => {
  const { message } = props;
  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
    >
      <Alert
        message={message}
        type="success"
        showIcon
      />
    </Space>
  );
};

export default AlertUi;
