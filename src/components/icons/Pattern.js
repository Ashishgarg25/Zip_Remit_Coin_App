import React from 'react';
import Svg, {
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

const Pattern = () => {
  return (
    <Svg
      width="375"
      height="261"
      viewBox="0 0 375 261"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_1_40"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="375"
        height="261">
        <Rect width="375" height="261" fill="#C4C4C4" />
      </Mask>
      <G mask="url(#mask0_1_40)">
        <Path
          opacity="0.15"
          d="M264.164 8.96163L-111.78 101.536L-144.495 259.543L427.91 339.766L459.881 111.65L371.571 34.9048C342.116 9.30766 302.055 -0.368844 264.164 8.96163Z"
          fill="url(#paint0_linear_1_40)"
        />
        <Path
          opacity="0.15"
          d="M249.333 105.191L-72.7285 184.762L-99.9387 316.276L375.415 382.898L402.025 193.033L321.06 122.525C301.403 105.407 274.639 98.9384 249.333 105.191Z"
          fill="url(#paint1_linear_1_40)"
        />
        <Rect x="121" y="248" width="134" height="5" rx="2.5" fill="white" />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1_40"
          x1="351.406"
          y1="-70.9163"
          x2="177.297"
          y2="275.951"
          gradientUnits="userSpaceOnUse">
          <Stop stop-color="white" />
          <Stop offset="1" stop-color="white" stop-opacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1_40"
          x1="311.985"
          y1="41.1141"
          x2="166.908"
          y2="329.652"
          gradientUnits="userSpaceOnUse">
          <Stop stop-color="white" />
          <Stop offset="1" stop-color="white" stop-opacity="0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Pattern;
