import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { colors } from '../../../config/config';
import { fonts } from '../../../shared/theme/fonts';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../shared/Variables';

export type CheckBoxT = {
  title: string;
  tagname: string;
};

export const checkboxes: CheckBoxT[] = [
  { title: 'Générales', tagname: 'general' },
  { title: 'Actualités', tagname: 'actuality' },
  { title: 'Alertes météo', tagname: 'meteo' },
];

const checkbBoxSelected = require('../assets/checkbox.png');

interface Props {
  selectedItems: CheckBoxT[];
  handleCheckboxSelection: Function;
}

export const CustomCheckBox: React.FC<Props> = (props: Props) => {
  const isSelected = (checkbox: CheckBoxT) => {
    return props.selectedItems.some(x => x.title === checkbox.title);
  };

  return (
    <>
      {checkboxes.map(x => (
        <TouchableWithoutFeedback key={x.title} onPress={() => props.handleCheckboxSelection(x)}>
          <View style={styles.mainView}>
            <View style={isSelected(x) ? styles.squareSelected : styles.square}>
              {isSelected(x) ? (
                <Image source={checkbBoxSelected} style={styles.checkboxIcon} resizeMode="contain" />
              ) : null}
            </View>
            <Text style={isSelected(x) ? styles.selectedTitle : styles.title}>{x.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Math.max(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.045,
  },
  square: {
    borderRadius: 3,
    backgroundColor: colors.darkGrey,
    width: 21,
    height: 21,
  },
  squareSelected: {
    borderRadius: 3,
    backgroundColor: colors.mainColor,
    width: 21,
    height: 21,
  },
  title: {
    marginLeft: 12.5,
    marginTop: 4,
    textAlignVertical: 'center',
    fontFamily: fonts.regular,
    color: colors.darkGrey,
    fontSize: Math.max(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.023,
  },
  selectedTitle: {
    marginLeft: 12.5,
    marginTop: 4,
    textAlignVertical: 'center',
    fontFamily: fonts.regular,
    color: colors.darkGrey,
    fontSize: Math.max(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.023,
  },
  checkboxIcon: {
    alignSelf: 'center',
    width: 16,
    height: 18,
  },
});
