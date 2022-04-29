import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MoreOnIcon from '../../../shared/assets/icons/MoreOn.svg';
import MoreOffIcon from '../../../shared/assets/icons/MoreOff.svg';
import { colors } from '../../../config/config';
import { sizes } from '../../../shared/theme/sizes';
import { fonts } from '../../../shared/theme/fonts';
import I18n from '../../../config/locales';
import { MODAL_WIDTH } from '../../map/component/ModalFilter';

type Props = {
  category: { name: string; check: boolean };
  overlayCategories: Array<{ name: string; check: boolean }>;
  setOverlayCategories: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        check: boolean;
      }[]
    >
  >;
};

export const FilterIcon = (props: Props) => {
  const { category, overlayCategories, setOverlayCategories } = props;
  const [isPressed, setIsPressed] = useState(category.check);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setIsPressed(!isPressed);
        setOverlayCategories(
          overlayCategories.map(item => {
            return item === category ? { ...category, check: !category.check } : item;
          }),
        );
      }}
    >
      {isPressed ? (
        <View style={[styles.button, { borderColor: colors.mainColor }]}>
          <MoreOnIcon style={styles.iconStyle} />
          <Text style={[styles.name, { color: colors.mainColor }]}>{I18n.t('recycling.' + category.name)}</Text>
        </View>
      ) : (
        <View style={styles.button}>
          <MoreOffIcon style={styles.iconStyle} />
          <Text style={styles.name}>{I18n.t('recycling.' + category.name)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
    width: MODAL_WIDTH * 0.45,
    height: MODAL_WIDTH * 0.45,
  },
  button: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: '95%',
    height: '95%',
  },
  name: {
    position: 'absolute',
    bottom: 1,
    fontSize: sizes.large,
    fontFamily: fonts.bold,
  },
});
