import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import I18n from '../../../config/locales';
import { colors } from '../../../config/config';
import { fonts } from '../../../shared/theme/fonts';
import { sizes } from '../../../shared/theme/sizes';
import { WINDOW_WIDTH } from '../../../shared/Variables';
import { News } from '../News';

type Props = {
  news: News;
  onPress: () => void;
};

export const NewsItem = (props: Props) => {
  const { news, onPress } = props;

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image style={styles.image} source={{ uri: news.imageUrl }} />
      <View style={styles.info}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{I18n.t('news.publicated') + news.date.format('LL')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  image: {
    marginLeft: 3,
    height: WINDOW_WIDTH * 0.3,
    width: WINDOW_WIDTH * 0.3,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    width: '75%',
    marginLeft: 8,
  },
  title: {
    flex: 6,
    fontFamily: fonts.bold,
  },
  date: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: sizes.medium,
    color: colors.darkGrey,
  },
});
