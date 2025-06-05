import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
const FilterIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      d="M10.0833 17.7497H23.375M1.625 17.7497H5.25M5.25 17.7497V20.1663M5.25 17.7497V15.333M22.1667 10.4997H23.375M1.625 10.4997H17.3333M17.3333 10.4997V12.9163M17.3333 10.4997V8.08301M14.9167 3.24967H23.375M1.625 3.24967H10.0833M10.0833 3.24967V5.66634M10.0833 3.24967V0.833008"
      stroke="#15161E"
      stroke-width="1.29167"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    {/* <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.01)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACe0lEQVR4nO3bT27TQBzF8WyAK/CnF+IKiAO0KgskDjC/F2VRMi5SlrkGcAX+CChHYMUCsUFQYIUomhKJyCJpEjn2i/P9SLNpR+rIrzN1Hb/BAACAHZFSuq6sB1HF66jiuypdzI8oX8t6FVUcl7ldr7fX0uN0O3K8r4ewZJyNnoxudb3uXiq/7WuGcTHbMe+m0+m1rtffO+WYWjcM/QvlqOv19075m1G7yE/LEVafNzod3VHWs9rcl92suseUdT5/kcuFXzQ3naSDWiDf2l3tHqgfQ03Px5oIxAyBmCGQDQ1Ph/cjx+dNb1FXHVetQwvmb3tdbY2o4oOy7i69COUfsMjxs40F7XsgKqHk+Lj0Ikwmkxuq9INA5BFIMRwP70WOT+wQdX9kbVNTRxYaQiBmCMQMgZgpDwjnQ+Hhotnj9/KI/X+hpJN0EFU8r92R8Ph9C4Ecb3ybmHXY+IL23eXLDZXONrhff8NHuFtSXlgon5GvsTPe8pLDll0+L6viSFkv6p8i6m8I57PvHbIzAAAAAAAAOpVodPlINLp8JBpdXkSjy0vQ6PIiGl1exJuUXkQgXkQgXrQrgbTVoHIbgyssmt+bBtW+ByK3BpXbGDgG0maDat8Dia4bVG7UUCBoCIGYETvEiwjES9Do8hI0urwEjS4viUaXnxGNLj9TGl0AAAAAAKB9NJOM0EwyQjPJDM0kMzSTzNBMMsPrNWYIxAyBmCGQhkWOR8r6uquv+WtHxkp1hDRONyPHryZ/MIFo88LOLJDfBKJ2dskqDSqN9VBZX9gh6v7IakJTRxYaQiBmCMQMgZihmWSGZpIZmklmaCYZoplkiGYSAACDVv0BVzwuglwnJ6oAAAAASUVORK5CYII="
        id="b"
        width={100}
        height={100}
      />
    </Defs> */}
  </Svg>
);
export default FilterIcon;
