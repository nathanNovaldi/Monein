import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../../shared/theme/fonts';
import { RecyclingCenter } from '../RecyclingCenter';
import MoreOnIcon from '../../../shared/assets/icons/MoreOn.svg';
import { sizes } from '../../../shared/theme/sizes';
import { colors } from '../../../config/config';

type Props = {
  recyclingCenter: RecyclingCenter;
};

export const DescriptionMarker = (props: Props) => {
  const { recyclingCenter } = props;
  return (
    <View style={styles.container}>
      <View style={styles.markerDescriptionContainer}>
        <Text style={styles.markerDescriptionName}>{recyclingCenter.name}</Text>
        <Text style={styles.markerDescriptionAddress}>{(recyclingCenter.address, ' ,', recyclingCenter.city)}</Text>
        <View style={styles.iconContainer}>
          {Object.entries(recyclingCenter.selecting).map(item => {
            return item[1] ? <MoreOnIcon style={styles.iconStyle} /> : undefined;
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  markerDescriptionContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
    padding: 10,
    width: 150,
  },
  markerDescriptionName: {
    fontFamily: fonts.bold,
    fontSize: sizes.large,
  },
  markerDescriptionAddress: {
    color: colors.darkGrey,
  },
  iconContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
});
