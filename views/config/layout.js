import { Dimensions } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;
export const WP = wp;
export const HP = hp;