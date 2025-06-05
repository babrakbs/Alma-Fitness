import * as React from 'react';
import Svg, {Circle, G, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PlanIcon1 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={51}
    height={22}
    fill="none"
    {...props}>
    <Circle cx={11} cy={11} r={6} fill="#EFEFEB" />
    <Circle cx={25} cy={11} r={4} fill="#46515A" />
    <Circle cx={36} cy={11} r={4} fill="#46515A" />
    <Circle cx={47} cy={11} r={4} fill="#46515A" />
    <G filter="url(#a)" opacity={0.35}>
      <Circle cx={11} cy={11} r={7} fill="#46515A" />
    </G>
    <Defs></Defs>
  </Svg>
);
export default PlanIcon1;
