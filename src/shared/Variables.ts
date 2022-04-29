/* @flow */

import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');
export const WINDOW_WIDTH = Math.min(window.width, window.height);
export const WINDOW_HEIGHT = Math.max(window.width, window.height);

const screen = Dimensions.get('screen');
export const SCREEN_WIDTH = Math.min(screen.width, screen.height);
export const SCREEN_HEIGHT = Math.max(screen.width, screen.height);

export const IS_TABLET = DeviceInfo.isTablet();

export const SMALL_DISPLAY = WINDOW_HEIGHT <= 650;

export const isX = Platform.OS === 'ios' && WINDOW_HEIGHT > 800;

export const IOS_STATUSBAR_HEIGHT = isX ? 44 : 20;
export const IOS_BOTTOM_BAR_HEIGHT = isX ? 34 : 0;
