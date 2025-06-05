import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CrossCircleIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}>
    <Path
      d="M7.45833 7.45833L34.5417 34.5417M21 40.5C10.2304 40.5 1.5 31.7696 1.5 21C1.5 10.2304 10.2304 1.5 21 1.5C31.7696 1.5 40.5 10.2304 40.5 21C40.5 31.7696 31.7696 40.5 21 40.5Z"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default CrossCircleIcon;
