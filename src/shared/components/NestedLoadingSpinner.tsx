/* @flow */

import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ANIMATION = require('../assets/animation_loading.json');

type Props = {
  loading?: boolean;
  containerStyle?: Object;
  animationStyle?: Object;
  color: string;
};

export const NestedLoadingSpinner = ({ loading, containerStyle, animationStyle, color }: Props) => {
  if (loading) {
    return (
      <View style={containerStyle || styles.container}>
        <LottieView
          style={animationStyle || styles.animation}
          source={ANIMATION}
          loop
          autoPlay
          colorFilters={[{ keypath: '*', color }]}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  animation: {
    height: 100,
    width: 100,
  },
});
