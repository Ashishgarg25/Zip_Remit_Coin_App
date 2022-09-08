import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowRight = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={props.color}
      viewBox="0 0 24 24"
      stroke={props.color}
      strokeWidth={2}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </Svg>
  );
};

export default ArrowRight;
