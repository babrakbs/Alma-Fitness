import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ClockIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22 38.5c9.113 0 16.5-7.387 16.5-16.5S31.113 5.5 22 5.5 5.5 12.887 5.5 22 12.887 38.5 22 38.5Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M22 11v7.355c0 1.345 0 2.018.152 2.65.135.562.357 1.099.659 1.59.34.556.815 1.031 1.767 1.983l4.755 4.755"
    />
  </Svg>
);
export default ClockIcon;
