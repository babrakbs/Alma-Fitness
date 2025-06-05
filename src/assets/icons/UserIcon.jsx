import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const UserIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}>
    <Path
      stroke="#DBDCDB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 12.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22.5c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
    />
  </Svg>
);
export default UserIcon;
