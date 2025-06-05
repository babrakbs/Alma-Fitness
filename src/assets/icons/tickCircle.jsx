import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const TickCircleIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={46}
    fill="none"
    {...props}>
    <Path
      d="M29.6667 18.5556L20.7778 27.4444L16.3333 23M23 43C11.9543 43 3 34.0457 3 23C3 11.9543 11.9543 3 23 3C34.0457 3 43 11.9543 43 23C43 34.0457 34.0457 43 23 43Z"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default TickCircleIcon;
