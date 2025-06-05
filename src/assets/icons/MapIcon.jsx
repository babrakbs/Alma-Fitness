import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const MapIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      d="M15.6667 4.66667V23M15.6667 4.66667L23 1V19.3333L15.6667 23M15.6667 4.66667L8.33333 1M15.6667 23L8.33333 19.3333M8.33333 19.3333L1 23V4.66667L8.33333 1M8.33333 19.3333V1"
      stroke="#15161E"
      stroke-width="1.2s"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default MapIcon;
