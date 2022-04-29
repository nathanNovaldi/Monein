import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, HOME_LAYOUT } from '../../config/config';
import { NewsSlideShow } from '../news/component/NewsSlideShow';
import { newsStore } from '../news/NewsStore';
import { HomeButtonsList } from './component/HomeButtonsList';

export const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    newsStore.fetchIfNeeded();
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="notifications"
          size={26}
          color={colors.navBarIconColor}
          style={styles.notification}
          onPress={() => {
            navigation.navigate('Notifications');
          }}
        />
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {newsStore && <NewsSlideShow newsStore={newsStore} />}
        <HomeButtonsList buttonsList={HOME_LAYOUT} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  notification: {
    marginRight: 25,
  },
});
