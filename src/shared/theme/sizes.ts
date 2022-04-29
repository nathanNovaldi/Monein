import { IS_TABLET, SMALL_DISPLAY } from '../Variables';

export const sizes = {
  xxxxxlarge: IS_TABLET ? 80 : SMALL_DISPLAY ? 50 : 60,
  xxxxlarge: IS_TABLET ? 80 : SMALL_DISPLAY ? 40 : 50,
  xxxlarge: IS_TABLET ? 45 : SMALL_DISPLAY ? 25 : 35,
  xxlarge: IS_TABLET ? 28 : SMALL_DISPLAY ? 22 : 25,
  xlarge: IS_TABLET ? 26 : SMALL_DISPLAY ? 16 : 20,
  large: IS_TABLET ? 22 : SMALL_DISPLAY ? 14 : 16,
  medium: IS_TABLET ? 20 : SMALL_DISPLAY ? 13 : 14,
  small: IS_TABLET ? 18 : SMALL_DISPLAY ? 10 : 12,
  xsmall: IS_TABLET ? 12 : SMALL_DISPLAY ? 8 : 8,
  xxsmall: IS_TABLET ? 10 : SMALL_DISPLAY ? 5 : 5,
};
