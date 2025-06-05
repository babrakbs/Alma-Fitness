import * as React from 'react';
import Svg, {G, Rect, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const WhiteClose = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}>
    <G filter="url(#a)">
      <Rect
        width={25}
        height={25}
        fill="#989898"
        fillOpacity={0.05}
        rx={12.5}
      />
      <Rect
        width={24.5}
        height={24.5}
        x={0.25}
        y={0.25}
        stroke="#BCBCBC"
        strokeWidth={0.5}
        rx={12.25}
      />
    </G>
    <Path
      stroke="#EFEFEB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.292 17.96 10.67-10.668M17.961 17.96 7.291 7.292"
    />
    <Defs></Defs>
  </Svg>
);
export default WhiteClose;
