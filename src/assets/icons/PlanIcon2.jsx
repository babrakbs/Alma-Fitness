import * as React from 'react';
import Svg, {Circle, G, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const PlanIcon2 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={47}
    height={22}
    fill="none"
    {...props}>
    <Circle cx={18} cy={11} r={6} fill="#EFEFEB" />
    <G filter="url(#a)" opacity={0.35}>
      <Circle cx={18} cy={11} r={7} fill="#EFEFEB" />
    </G>
    <Circle cx={32} cy={11} r={4} fill="#DBDCDB" />
    <Circle cx={43} cy={11} r={4} fill="#DBDCDB" />
    <Circle cx={4} cy={11} r={4} fill="#DBDCDB" />
    <Defs></Defs>
  </Svg>
);
export default PlanIcon2;
