import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, FlatList } from 'react-native';
import { colors } from '../../config/config';
import { fonts } from '../../shared/theme/fonts';
import tinycolor from 'tinycolor2';

type Props = {
  width: number;
  height: number;
  images: Array<string>;
  onPress: (index: number) => void;
  texts?: Array<string>;
};

let intervalRef: any;
export const SlideShow = (props: Props) => {
  const { onPress, width, height, images, texts } = props;
  const flatListRef = useRef<FlatList>(null);
  let index = 0;

  const startInterval = () => {
    if (intervalRef) {
      clearInterval(intervalRef);
    }
    intervalRef = setInterval(() => {
      if (flatListRef && flatListRef.current) {
        index = index >= images.length - 1 ? 0 : index + 1;
        if (index <= images.length) {
          flatListRef.current.scrollToIndex({ index });
        }
      }
    }, 3000);
  };

  const endInterval = () => {
    if (intervalRef) {
      clearInterval(intervalRef);
    }
  };

  startInterval();

  return (
    <View style={styles.view}>
      <FlatList
        ref={flatListRef}
        data={images}
        style={{ ...styles.container, width, height }}
        keyExtractor={item => {
          return item;
        }}
        onTouchStart={() => endInterval()}
        onTouchEnd={() => startInterval()}
        renderItem={({ item, index: ind }) => {
          return (
            <TouchableWithoutFeedback key={ind} style={styles.slide} onPress={() => onPress(ind)}>
              <View style={{ width, height }}>
                <Image style={styles.image} source={{ uri: item }} resizeMode="cover" />
                {texts ? (
                  <View style={styles.box}>
                    <Text numberOfLines={2} style={styles.text}>
                      {texts[ind]}
                    </Text>
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flexGrow: 0,
  },
  slide: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  box: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    width: '100%',
    backgroundColor: tinycolor(colors.mainColor).setAlpha(0.5).toHex8String(),
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 10,
    fontFamily: fonts.bold,
    color: colors.textLight,
  },
});
