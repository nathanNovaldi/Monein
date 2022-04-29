import React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { sizes } from '../theme/sizes';

type Props = {
  buttonStyle: ViewStyle;
  titleStyle?: TextStyle;
  title: string;
  onPress: () => void;
  icon?: IconNode;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
};
export function Button(props: Props) {
  return (
    <RNEButton
      title={props.title}
      onPress={props.onPress}
      buttonStyle={{ ...styles.buttonStyle, ...props.buttonStyle }}
      titleStyle={{ ...styles.titleStyle, ...props.titleStyle }}
      icon={props.icon}
      iconContainerStyle={props.iconContainerStyle}
      iconPosition={props.iconPosition}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  titleStyle: {
    color: colors.textLight,
    fontFamily: fonts.regular,
    fontSize: sizes.large,
  },
});
