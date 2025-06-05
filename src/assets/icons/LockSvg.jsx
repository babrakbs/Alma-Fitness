import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const LockSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      fill="#666"
      d="M4.167 18.333h11.666a1.667 1.667 0 0 0 1.667-1.666v-7.5A1.667 1.667 0 0 0 15.833 7.5h-1.666V5.833a4.167 4.167 0 0 0-8.334 0V7.5H4.167A1.667 1.667 0 0 0 2.5 9.167v7.5a1.667 1.667 0 0 0 1.667 1.666ZM10 14.583a1.666 1.666 0 1 1 0-3.332 1.666 1.666 0 0 1 0 3.332ZM7.5 7.5V5.833a2.5 2.5 0 1 1 5 0V7.5h-5Z"
    />
  </Svg>
);
export default LockSvg;
