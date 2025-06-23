import * as React from 'react';
import Svg, {Mask, Path, G, Defs, Pattern, Use, Image} from 'react-native-svg';

const MapPinClass = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={17}
    height={21}
    fill="none"
    {...props}>
    <Path
      d="M1.30078 8.46266C1.30078 13.6079 5.80198 17.8629 7.79432 19.4942C8.07946 19.7277 8.22373 19.8458 8.43646 19.9057C8.60211 19.9523 8.8459 19.9523 9.01155 19.9057C9.22468 19.8457 9.36794 19.7287 9.65416 19.4943C11.6465 17.863 16.1475 13.6084 16.1475 8.46313C16.1475 6.51596 15.3654 4.64831 13.9732 3.27146C12.5811 1.8946 10.6931 1.12109 8.72425 1.12109C6.75545 1.12109 4.86719 1.89472 3.47504 3.27158C2.08289 4.64843 1.30078 6.51549 1.30078 8.46266Z"
      stroke="#8A8A8A"
      stroke-width="1.59072"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M6.6032 7.48399C6.6032 8.65537 7.55279 9.60496 8.72416 9.60496C9.89554 9.60496 10.8451 8.65537 10.8451 7.48399C10.8451 6.31261 9.89554 5.36303 8.72416 5.36303C7.55279 5.36303 6.6032 6.31261 6.6032 7.48399Z"
      stroke="#8A8A8A"
      stroke-width="1.59072"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default MapPinClass;
