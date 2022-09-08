import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const DefaultProfileIcon = props => {
  return (
    <Svg
      width="105"
      height="97"
      viewBox="0 0 105 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M0 48.5C0 21.7142 21.7142 0 48.5 0C75.2858 0 97 21.7142 97 48.5C97 75.2858 75.2858 97 48.5 97C21.7142 97 0 75.2858 0 48.5Z"
        fill="#F2F2F2"
      />
      <Path
        d="M48.5 26.6758C45.9274 26.6758 43.4602 27.6977 41.641 29.5168C39.8219 31.3359 38.8 33.8032 38.8 36.3758C38.8 38.9484 39.8219 41.4156 41.641 43.2347C43.4602 45.0538 45.9274 46.0758 48.5 46.0758C51.0726 46.0758 53.5398 45.0538 55.3589 43.2347C57.178 41.4156 58.2 38.9484 58.2 36.3758C58.2 33.8032 57.178 31.3359 55.3589 29.5168C53.5398 27.6977 51.0726 26.6758 48.5 26.6758ZM48.5 53.3508C41.2153 53.3508 26.675 57.0077 26.675 64.2633V67.9008C26.675 69.2394 27.7614 70.3258 29.1 70.3258H67.9C69.2386 70.3258 70.325 69.2394 70.325 67.9008V64.2633C70.325 57.0077 55.7847 53.3508 48.5 53.3508Z"
        fill="#B5B5B5"
      />
      <Circle cx="85" cy="73" r="20" fill={props.color} />
      <Path
        d="M82 64C80.895 64 80 64.895 80 66V67H77C75.895 67 75 67.895 75 69V80C75 81.105 75.895 82 77 82H93C94.105 82 95 81.105 95 80V69C95 67.895 94.105 67 93 67H90V66C90 64.895 89.105 64 88 64H82ZM85 69C87.757 69 90 71.243 90 74C90 76.757 87.757 79 85 79C82.243 79 80 76.757 80 74C80 71.243 82.243 69 85 69ZM92 69C92.552 69 93 69.448 93 70C93 70.552 92.552 71 92 71C91.448 71 91 70.552 91 70C91 69.448 91.448 69 92 69ZM85 71C84.2044 71 83.4413 71.3161 82.8787 71.8787C82.3161 72.4413 82 73.2044 82 74C82 74.7956 82.3161 75.5587 82.8787 76.1213C83.4413 76.6839 84.2044 77 85 77C85.7956 77 86.5587 76.6839 87.1213 76.1213C87.6839 75.5587 88 74.7956 88 74C88 73.2044 87.6839 72.4413 87.1213 71.8787C86.5587 71.3161 85.7956 71 85 71Z"
        fill="white"
      />
    </Svg>
  );
};

export default DefaultProfileIcon;