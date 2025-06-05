import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const HomeIcon = props => (
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
      d="m9.02 3.34-5.39 4.2C2.73 8.24 2 9.73 2 10.86v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V11c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12Z"
    />
    <Path fill="#DBDCDB" d="M12 18.49v-3 3Z" />
    <Path
      stroke="#DBDCDB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 18.49v-3"
    />
  </Svg>
);
export default HomeIcon;
