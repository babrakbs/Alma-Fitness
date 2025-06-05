import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CalendarIcon = props => (
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
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8 2.5v3M16 2.5v3M3.5 9.59h17M21 9v8.5c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V9c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
    />
    <Path
      stroke="#DBDCDB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.995 14.2h.01M8.294 14.2h.01M8.294 17.2h.01"
    />
  </Svg>
);
export default CalendarIcon;
