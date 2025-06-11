<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.93417 4.1312C7.9488 -0.528896 1 -0.0325527 1 5.92359C1 11.8797 9.93417 16.8433 9.93417 16.8433C9.93417 16.8433 18.8683 11.8797 18.8683 5.92359C18.8683 -0.0325527 11.9195 -0.528896 9.93417 4.1312Z" stroke="white" stroke-width="1.29049" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const HeartIconWhite = props => (
  <Svg
   width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9.93417 4.1312C7.9488 -0.528896 1 -0.0325527 1 5.92359C1 11.8797 9.93417 16.8433 9.93417 16.8433C9.93417 16.8433 18.8683 11.8797 18.8683 5.92359C18.8683 -0.0325527 11.9195 -0.528896 9.93417 4.1312Z" stroke="white" stroke-width="1.29049" stroke-linecap="round" stroke-linejoin="round" />
    <Path fill="#ffffff" d="M12 18.49v-3 3Z" />
    <Path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 18.49v-3"
    />
  </Svg>
);
export default HeartIconWhite;
