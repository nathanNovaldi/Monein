import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import I18n from '../../config/locales';
import Log from '../../shared/Log';
import { colors } from '../../config/config';
import { fonts } from '../../shared/theme/fonts';
import { sizes } from '../../shared/theme/sizes';

export const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setTimeout(() => {
      Log.d('Splash', 'Showing home');
      navigation.navigate('Home');
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('splash.load')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  title: { flex: 0, color: colors.textDark, fontFamily: fonts.bold, fontSize: sizes.xxxlarge },
});
