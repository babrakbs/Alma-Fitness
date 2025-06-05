import React from 'react';
import Lock from '../assets/icons/lock.svg';
import EyeCross from '../assets/icons/eyecross.svg';
import Tick from '../assets/icons/tick.svg';
import ArrowDown from '../assets/icons/ArrowDown.svg';
import AlmaLogo from '../assets/images/Alma_Brandmark_White.svg';
import GoogleTranslate from '../assets/images/GoogleTranslate.svg';
import AlmaLogoBlackIcon from '../assets/icons/AlmaLogoBlack.svg';
import Google from '../assets/images/Google.svg';
import Apple from '../assets/images/Apple.svg';
import AppleWhite from '../assets/icons/AppleIconWhite.svg';

import Warning from '../assets/icons/WarnIngRed.svg';
import Stop from '../assets/icons/stop.svg';


import ArrowBack from '../assets/icons/ArrowBack.svg';
import Facebook from '../assets/images/Facebook.svg';
import PlanIcon1 from '../assets/icons/PlanIconOne.svg';
import Camera from '../assets/icons/Camera.svg';
import ArrowBackWhite from '../assets/icons/ArrowBackWhite.svg';
import ArrowDownBlack from '../assets/icons/ArrowDownBlack.svg';
import ArrowRight from '../assets/icons/ArrowRight.svg';
import Card from '../assets/icons/card.svg';
import Delete from '../assets/icons/delete.svg';
import CheckCircle from '../assets/icons/Check_Circle.svg';


import Heart from '../assets/images/Heart.svg';
import HeartWhite from '../assets/icons/heartIconWhite.svg';
import Filter from '../assets/icons/Filter.svg';
import TickSuccess from '../assets/icons/tick-circle.svg'
import DangerIcon from '../assets/icons/danger.svg';
import DropDownBlack from '../assets/icons/dropdown.svg';



import WhiteLogo from '../assets/icons/Alma_Brandmark_White 2.svg';


interface Icons {
  style?: Object;
  width?: any;
  height?: any;
}

export const LockIcon = ({style}: Icons) => (
  <Lock height={16.67} width={15} style={style} />
);
export const WhiteLogoIcon = ({style}: Icons) => (
  <WhiteLogo />
);
export const Checkcircle = ({style}: Icons) => (
  <CheckCircle  height={50} width={50}/>
);
export const TickSuccessIcon = ({style}: Icons) => (
  <TickSuccess  style={style} />
);
export const DangerwarningIcon = ({style}: Icons) => (
  <DangerIcon  style={style} />
);
export const FilterIcon = ({style}: Icons) => (
  <Filter height={20} width={18} style={style} />
);
export const EyeCrossIcon = ({style}: Icons) => (
  <EyeCross height={16.67} width={16.67} style={style} />
);
export const TickIcon = ({style}: Icons) => (
  <Tick height={16.67} width={16.67} style={style} />
);
export const ArrowDownIcon = ({style}: Icons) => (
  <ArrowDown height={16.67} width={16.67} style={style} />
);
export const AlmaLogoImage = ({height, width, style}: Icons) => (
  <AlmaLogo height={height} width={width} style={style} />
);
export const GoogleTranslateIcon = ({style}: Icons) => (
  <GoogleTranslate height={18} width={18} style={style} />
);
export const AlmaLogoBlack = ({style, width, height}: Icons) => (
  <AlmaLogoBlackIcon height={height} width={width} style={style} />
);
export const DropDown = ({style, width, height}: Icons) => (
  <DropDownBlack height={height} width={width} style={style} />
);
export const HeartIconWhite = ({style, width, height}: Icons) => (
  <Heart height={height} width={width} style={style} />
);
export const HeartIconWhites = ({style, width, height}: Icons) => (
  <HeartWhite height={height} width={width} style={style} />
);

export const GoogleIcon = ({style}: Icons) => {
  return <Google height={32} width={32} />;
};
export const FacebookIcon = ({style}: Icons) => {
  return <Facebook height={32} width={32} />;
};
export const AppleIcon = ({style}: Icons) => {
  return <Apple height={32} width={32} style={style} />;
};
export const AppleIconWhite = ({style,height,width}: Icons) => {
  return <AppleWhite height={height} width={width} style={style} />;
};
export const WarningRed = ({style, width, height}: Icons) => {
  return <Warning height={height} width={width} />;
};

export const PaymentUnsuccessful = ({style, width, height}: Icons) => {
  return <Stop height={height} width={width} />;
};

export const PlanIconOne = ({style}: Icons) => {
  return <PlanIcon1 height={47} width={47} />;
};

export const ArrowBackIcon = ({style}: Icons) => {
  return <ArrowBack height={32} width={32} />;
};

export const ArrowBackWhiteIcon = ({style}: Icons) => {
  return <ArrowBackWhite height={20} width={20} />;
};

export const CameraIcon = ({style}: Icons) => {
  return <Camera height={17} width={17} />;
};

export const ArrowDownBlackIcon = ({style}: Icons) => {
  return <ArrowDownBlack height={17} width={17} />;
};

export const ArrowRightIcon = ({style}: Icons) => {
  return <ArrowRight height={17} width={17} />;
};

export const CardIcon = ({style}: Icons) => {
  return <Card height={30} width={30} />;
};

export const DeleteIcon = ({style}: Icons) => {
  return <Delete height={20} width={20} />;
};
