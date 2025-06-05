import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const FilterIconSecondary = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#818C81"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z"
    />
  </Svg>
);
export default FilterIconSecondary;
