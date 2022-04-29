import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SlideShow } from '../../../shared/components/SlideShow';
import { WINDOW_WIDTH } from '../../../shared/Variables';
import { NewsStore } from '../NewsStore';

type Props = {
  newsStore: NewsStore;
};

export const NewsSlideShow = inject('newsStore')(
  observer((props: Props) => {
    const { news } = props.newsStore;
    const navigation = useNavigation();
    const images = news.map(n => {
      return n.imageUrl;
    });
    const texts = news.map(n => {
      return n.title;
    });

    return (
      <View style={styles.slideshowContainer}>
        <SlideShow
          width={WINDOW_WIDTH - 6}
          height={220}
          images={images.slice(0, 3)}
          onPress={index => {
            navigation.navigate('NewsDetail', { newsId: news[index].id });
          }}
          texts={texts.slice(0, 3)}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  slideshowContainer: {
    alignItems: 'center',
  },
});
