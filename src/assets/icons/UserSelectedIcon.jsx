import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const UserSelectedIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}>
    <Path fill="#F5F5F5" d="M12 12.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    <Path
      fill="#F5F5F5"
      stroke="#F5F5F5"
      d="M3.41 22.5c0-3.778 3.762-7 8.59-7 4.828 0 8.59 3.222 8.59 7H3.41Z"
    />
  </Svg>
);
export default UserSelectedIcon;
