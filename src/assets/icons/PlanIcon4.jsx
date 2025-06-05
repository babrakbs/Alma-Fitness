import * as React from 'react';
import Svg, {Circle, G, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PlanIcon4 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={51}
    height={22}
    fill="none"
    {...props}>
    <Circle cx={40} cy={11} r={6} fill="#EFEFEB" />
    <G filter="url(#a)" opacity={0.35}>
      <Circle cx={40} cy={11} r={7} fill="#EFEFEB" />
    </G>
    <Circle cx={4} cy={11} r={4} fill="#DBDCDB" />
    <Circle cx={26} cy={11} r={4} fill="#DBDCDB" />
    <Circle cx={15} cy={11} r={4} fill="#DBDCDB" />
    <Defs></Defs>
  </Svg>
);
export default PlanIcon4;
