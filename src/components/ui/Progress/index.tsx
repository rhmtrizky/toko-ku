import { Flex, Progress } from 'antd';
import type { ProgressProps } from 'antd';

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const conicColors: ProgressProps['strokeColor'] = {
  '0%': '#87d068',
  '50%': '#ffe58f',
  '100%': '#ffccc7',
};
type PropTypes = {
  percent: number;
};

const ProgressUi: React.FC<PropTypes> = (props) => {
  const { percent } = props;
  return (
    <Flex
      vertical
      gap="middle"
    >
      <Progress
        percent={percent}
        strokeColor={twoColors}
        type="circle"
        size={80}
      />
    </Flex>
  );
};

export default ProgressUi;
