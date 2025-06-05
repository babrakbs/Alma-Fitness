import * as React from 'react';
import Svg, {Rect, G, Path, Defs, ClipPath} from 'react-native-svg';
const TiltRectangleIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    {...props}>
    <Rect width={34} height={34} fill="#EFEFEB" fillOpacity={0.5} rx={10} />
    <G clipPath="url(#a)">
      <Path
        stroke="#424242"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.75}
        d="M15.609 24.79 9.21 18.391c-.724-.724-.724-2.057 0-2.782l6.399-6.399c.724-.724 2.058-.724 2.782 0l6.4 6.4c.724.724.724 2.057 0 2.781l-6.4 6.4c-.724.724-2.058.724-2.782 0v0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M7 7h20v20H7z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default TiltRectangleIcon;
