import { ProgressBar } from 'primereact/progressbar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const ProgressUi = ({ percent }: { percent: number }) => {
  return (
    <div className="card">
      <ProgressBar value={percent}></ProgressBar>
    </div>
  );
};

export default ProgressUi;
