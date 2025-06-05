import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EyeOpenSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#666"
      d="M9 3C4 3 1 9 1 9s3 6 8 6 8-6 8-6-3-6-8-6Zm0 10.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"
    />
    <Path
      fill="#666"
      d="M9 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
    />
  </Svg>
);

export default EyeOpenSvg;
