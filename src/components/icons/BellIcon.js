import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BellIcon = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 2C11.172 2 10.5 2.672 10.5 3.5V4.19531C7.913 4.86231 6 7.205 6 10V16L4 18V19H20V18L18 16V10C18 7.205 16.087 4.86427 13.5 4.19727V3.5C13.5 2.672 12.828 2 12 2ZM10 20C10 21.105 10.896 22 12 22C13.104 22 14 21.104 14 20H10Z"
        fill="white"
      />
    </Svg>
  );
};

export default BellIcon;
