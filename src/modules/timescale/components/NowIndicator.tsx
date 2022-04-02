import React from 'react';
import { DSTify } from '../../../utils/date';

interface NowIndicatorProps {
  yScale: any;
}

const NowIndicator = ({ yScale }: NowIndicatorProps) => {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    setInterval(() => setNow(new Date()), 100);

    return () => {
      clearInterval();
    };
  }, []);

  return (
    <line
      x1="0"
      x2="100%"
      y1={yScale(DSTify(now))}
      y2={yScale(DSTify(now))}
      strokeWidth="1"
      stroke="red"
    />
  );
};

export default React.memo(NowIndicator);
