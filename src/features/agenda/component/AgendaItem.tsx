import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';
import { fonts } from '../../../shared/theme/fonts';
import { sizes } from '../../../shared/theme/sizes';
import { AgendaEvent } from '../AgendaEvent';
import { colors } from '../../../config/config';
type Props = {
  agendaEvent: AgendaEvent;
  onPress: () => void;
};

export const AgendaItem = (props: Props) => {
  const { agendaEvent, onPress } = props;

  const majusculeMonth = (month: string) => {
    return (month + '').charAt(0).toUpperCase() + month.substr(1);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={{ uri: agendaEvent.imageUrl }} />
      {agendaEvent.dateStart.isSame(agendaEvent.dateEnd, 'day') ? (
        <View style={styles.dateContainer}>
          <Text style={styles.day}>{agendaEvent.dateStart.format('DD')}</Text>
          <Text style={styles.month}>{majusculeMonth(agendaEvent.dateStart.format('MMM'))}</Text>
        </View>
      ) : (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ ...styles.dateContainer, width: 140, flexDirection: 'row' }}>
          <View style={styles.groupDate}>
            <Text style={styles.day}>{agendaEvent.dateStart.format('DD')}</Text>
            <Text style={styles.month}>{majusculeMonth(agendaEvent.dateStart.format('MMM'))}</Text>
          </View>
          <View style={styles.dateSeparator} />
          <View style={styles.groupDate}>
            <Text style={styles.day}>{agendaEvent.dateEnd.format('DD')}</Text>
            <Text style={styles.month}>{majusculeMonth(agendaEvent.dateEnd.format('MMM'))}</Text>
          </View>
        </View>
      )}
      <Text style={styles.category}>
        {agendaEvent.category.map(item => {
          return item + ' ';
        })}
      </Text>
      <Text style={styles.city}>{agendaEvent.city}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {agendaEvent.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: '100%',
  },
  dateContainer: {
    position: 'absolute',
    backgroundColor: colors.mainColor,
    zIndex: 20,
    top: 140,
    left: 10,
    height: 70,
    width: 70,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSeparator: {
    width: 8,
    height: 5,
    backgroundColor: colors.textLight,
    marginLeft: 5,
    marginRight: 10,
    borderRadius: 2,
  },
  groupDate: {
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  day: {
    color: colors.textLight,
    fontFamily: fonts.bold,
    fontSize: sizes.xxlarge,
    alignSelf: 'center',
  },
  month: {
    color: colors.textLight,
    fontFamily: fonts.bold,
    fontSize: sizes.large,
  },
  image: {
    height: 220,
    width: '100%',
  },
  title: {
    marginTop: 3,
    marginLeft: 15,
    fontFamily: fonts.bold,
    fontSize: sizes.xlarge,
  },
  category: {
    marginTop: 10,
    marginLeft: 15,
    color: colors.darkGrey,
  },
  city: {
    marginTop: 5,
    marginLeft: 15,
    fontFamily: fonts.semiBold,
    fontSize: sizes.large,
    color: colors.mainColor,
  },
});
