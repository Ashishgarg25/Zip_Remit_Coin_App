import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackIcon = props => {
  return (
    <Svg
      width={props.width ? props.width : 24}
      height={props.height ? props.height : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10 5.3418C9.74413 5.3418 9.48798 5.44122 9.29298 5.63672L3.63673 11.293C3.24573 11.684 3.24573 12.317 3.63673 12.707L9.29298 18.3633C9.68398 18.7543 10.317 18.7543 10.707 18.3633L10.793 18.2773C11.184 17.8863 11.184 17.2533 10.793 16.8633L6.92969 13H20C20.552 13 21 12.552 21 12C21 11.448 20.552 11 20 11H6.92969L10.793 7.13672C11.184 6.74572 11.184 6.11266 10.793 5.72266L10.707 5.63672C10.5115 5.44122 10.2559 5.3418 10 5.3418Z"
        fill={props.color ? props.color : 'white'}
      />
    </Svg>
  );
};

export default BackIcon;
