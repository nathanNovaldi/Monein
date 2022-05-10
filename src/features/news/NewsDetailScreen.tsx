import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { inject, observer } from 'mobx-react';
import { fonts } from '../../shared/theme/fonts';
import { colors } from '../../config/config';
import { WINDOW_WIDTH } from '../../shared/Variables';
import { NewsStore } from './NewsStore';
import { sizes } from '../../shared/theme/sizes';
import I18n from '../../config/locales';
import Menu from '../menuBottom/Menu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/core';

type Props = {
  route: any;
  newsStore: NewsStore;
};

export const NewsDetailScreen = inject('newsStore')(
  observer((props: Props) => {
    const { route, newsStore } = props;
    const newsId = route.params.itemID;
    const news = newsStore.getNews(newsId);

    if (news) {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Image source={{ uri: news.imageUrl }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.date}>{I18n.t('news.publicated') + news.date.format('LL')}</Text>
            <View style={styles.line} />
            <RenderHtml
              containerStyle={styles.content}
              contentWidth={WINDOW_WIDTH}
              source={{ html: news.text }}
              ignoredStyles={['font-family']}
              baseFontStyle={{ fontFamily: fonts.regular }}
            />
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    height: 200,
    width: '100%',
  },
  title: {
    marginTop: 10,
    marginLeft: '2.5%',
    fontFamily: fonts.bold,
    fontSize: sizes.xlarge,
  },
  date: {
    marginTop: 15,
    marginLeft: '2.5%',
    color: colors.darkGrey,
  },
  line: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: colors.darkGrey,
    height: 1,
    marginVertical: 10,
  },
  content: {
    margin: 10,
  },
});
