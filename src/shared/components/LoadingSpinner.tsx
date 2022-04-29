/* @flow */

import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ANIMATION = require('../assets/animation_loading.json');

type Props = {
  loading?: boolean;
  color: string;
};

export const LoadingSpinner = ({ loading, color = 'pink' }: Props) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <LottieView
          style={styles.animation}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  animation: {
    height: 100,
    width: 100,
  },
});
