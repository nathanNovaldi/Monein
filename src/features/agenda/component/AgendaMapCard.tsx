import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../config/config';
import { fonts } from '../../../shared/theme/fonts';
import { sizes } from '../../../shared/theme/sizes';
import { WINDOW_WIDTH } from '../../../shared/Variables';
import { AgendaEvent } from '../AgendaEvent';

type Props = {
  item: AgendaEvent;
};

export const CARD_WIDTH = WINDOW_WIDTH * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * 0.9;

export const AgendaMapCard = (props: Props) => {
  const { item } = props;
  const navigation = useNavigation();

  const majusculeMonth = (month: string) => {
    return (month + '').charAt(0).toUpperCase() + month.substr(1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => navigation.navigate('AgendaDetail', { agendaEventId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.imageCard} resizeMode="cover" />
        <View style={styles.dateContainer}>
          <Text style={styles.day}>{item.dateEnd.format('DD')}</Text>
          <Text style={styles.month}>{majusculeMonth(item.dateStart.format('MMM'))}</Text>
        </View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.city}>{item.city}</Text>
        <Text style={styles.titleCard} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: 10,
  },
  card: {
    flex: 1,
    marginBottom: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    overflow: 'hidden',
  },
  imageCard: {
    height: '65%',
  },
  dateContainer: {
    position: 'absolute',
    backgroundColor: colors.mainColor,
    zIndex: 20,
    left: '3%',
    bottom: '38%',
    height: 60,
    width: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    color: colors.textLight,
    fontFamily: fonts.bold,
    fontSize: sizes.xlarge,
  },
  month: {
    color: colors.textLight,
    fontFamily: fonts.bold,
  },
  titleCard: {
    marginLeft: 10,
    fontFamily: fonts.bold,
  },
  textCard: {
    marginTop: 5,
    marginLeft: 5,
    width: '80%',
    fontSize: sizes.small,
  },
  category: {
    marginTop: 3,
    marginLeft: 10,
    color: colors.darkGrey,
    fontSize: sizes.small,
  },
  city: {
    marginLeft: 10,
    fontFamily: fonts.semiBold,
    fontSize: sizes.small,
    color: colors.mainColor,
  },
});
