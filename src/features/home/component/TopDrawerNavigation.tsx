import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import BackIcon from '../icons/BackIcon';

const TopDrawerNavigator = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableHighlight>
        underlayColor="#f0ddcc" onPress=
        {() => {
          navigation.openDrawer();
        }}
      </TouchableHighlight>
    </View>
  );
};

export default TopDrawerNavigator;
