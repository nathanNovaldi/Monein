import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HOMECELL_WIDTH } from './HomeButtonsList';
import { HomeSpec } from '../HomeSpec';
import { colors } from '../../../config/config';
import { sizes } from '../../../shared/theme/sizes';
import { fonts } from '../../../shared/theme/fonts';
import I18n from '../../../config/locales';

type Props = {
  button: HomeSpec;
};

export const HomeButton = (props: Props) => {
  const { button } = props;
  const navigation = useNavigation();
  const [underlay, setUnderlay] = useState(false);

  const buttonIcon = button.getIcon(underlay);

  return (
    <TouchableHighlight
      style={{
        ...styles.buttonStyle,
        width: button.width * HOMECELL_WIDTH,
        height: button.height * HOMECELL_WIDTH,
        top: button.y * HOMECELL_WIDTH,
        left: button.x * HOMECELL_WIDTH,
      }}
      onPress={() => navigation.navigate(button.redirection, button.params)}
      underlayColor={colors.mainColor}
      onShowUnderlay={() => setUnderlay(true)}
      onHideUnderlay={() => setUnderlay(false)}
    >
      <View style={styles.viewButton}>
        {buttonIcon}
        <Text style={underlay ? { ...styles.title, color: colors.textLight } : styles.title}>
          {I18n.t(button.title)}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    backgroundColor: colors.btn_background,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 100,
    height: 100,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: sizes.large,
    textAlign: 'center',
    color: 'black',
  },
});
