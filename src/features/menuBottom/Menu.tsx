import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.bouton}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <MaterialIcons name="home" size={35} color="#31AA9B" style={styles.home} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bouton}
        onPress={() => {
          navigation.navigate('Agenda');
        }}
      >
        <AntDesign name="calendar" size={30} color="#31AA9B" style={styles.calendar} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bouton}
        onPress={() => {
          navigation.navigate('Map');
        }}
      >
        <FontAwesome5Icon name="map-marker-alt" size={30} color="#31AA9B" style={styles.marker} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bouton}
        onPress={() => {
          navigation.navigate('NewsList');
        }}
      >
        <SimpleLineIcons name="book-open" size={30} color="#31AA9B" style={styles.book} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  LOGO: { width: 100, height: 50, bottom: 10 },

  topBar: {
    backgroundColor: '#2C2C2C',
    height: 40,
  },

  bottomBar: {
    backgroundColor: '#1C7069',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 9,
    paddingRight: 15,
  },
  whiteBar: {
    height: 20,
  },

  googleMaps: {
    alignItems: 'center',
  },

  home: {
    alignItems: 'center',
    paddingRight: 6,
  },

  calendar: {
    alignItems: 'center',
  },

  marker: {
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },

  book: {
    alignItems: 'center',
  },
});

export default Menu;
