import React from 'react';
import Svg, {Path} from 'react-native-svg';

const DropdownIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      stroke={props.color}
      strokeWidth={2}>
      <Path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </Svg>
  );
};

export default DropdownIcon;
