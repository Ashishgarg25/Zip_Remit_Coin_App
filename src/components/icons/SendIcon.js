import React from 'react';
import Svg, {Path} from 'react-native-svg';

const SendIcon = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22ZM12.707 7.293L16 10.586C16.39 10.977 16.39 11.61 16 12C15.61 12.39 14.976 12.39 14.586 12L13 10.414L13 16C13 16.552 12.552 17 12 17C11.448 17 11 16.552 11 16L11 10.414L9.414 12C9.024 12.39 8.39 12.39 8 12C7.61 11.61 7.61 10.976 8 10.586L11.293 7.293C11.683 6.903 12.317 6.903 12.707 7.293Z"
        fill="white"
      />
    </Svg>
  );
};

export default SendIcon;
