import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ExploreIcon = props => (
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
      d="M12 21.5a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
    <Path
      stroke="#DBDCDB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m16 8.5-2 6-6 2 2-6 6-2Z"
    />
  </Svg>
);
export default ExploreIcon;
