import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import './index.css';

function Humidity({ moisture }) {
  let barColor = '#E1ECDA';
  let progressColor = '#B0D09B';

  if (moisture < 60) {
    if (moisture >= 40) {
      barColor = '#F5E7BA';
      progressColor = '#EBCC66';
    } else {
      barColor = '#ECD8D8';
      progressColor = '#E47B7B';
    }   
  }

  return (
      <CircularProgressbarWithChildren
        value={moisture}
        maxValue={100}
        styles={{
          path: { stroke: progressColor },
          trail: { stroke: barColor }
        }}>
        <div style={{ color: '#B99A39', fontSize: 16}}>Humidity</div>
        <div style={{ color: '#878986', fontWeight: 800}}>{moisture + '%'}</div>
      </CircularProgressbarWithChildren>
  )
}

export default Humidity;
