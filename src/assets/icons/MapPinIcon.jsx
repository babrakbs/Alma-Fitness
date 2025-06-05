import * as React from 'react';
import Svg, {Mask, Path, G, Defs, Pattern, Use, Image} from 'react-native-svg';
const MapPinIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Mask
      id="b"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <Path fill="url(#a)" d="M0 0h16v16H0z" />
    </Mask>
    <G mask="url(#b)">
      <Path fill="#373A36" d="M0 0h16v16H0z" />
    </G>
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#c" transform="scale(.01)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="c"
        width={100}
        height={100}
      />
    </Defs>
  </Svg>
);
export default MapPinIcon;
