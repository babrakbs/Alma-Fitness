import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ArrowIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}>
    <Path
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 13 6-6-6-6"
    />
  </Svg>
);
export default ArrowIcon;
