import React from 'react';
import NewsIcon from '../../shared/assets/icons/NewsOff.svg';
import NewsIconWhite from '../../shared/assets/icons/NewsOn.svg';
import AgendaIcon from '../../shared/assets/icons/AgendaOff.svg';
import AgendaIconWhite from '../../shared/assets/icons/AgendaOn.svg';
import WeatherIcon from '../../shared/assets/icons/WeatherOff.svg';
import WeatherIconWhite from '../../shared/assets/icons/WeatherOn.svg';
import LocationIcon from '../../shared/assets/icons/LocationOff.svg';
import LocationIconWhite from '../../shared/assets/icons/LocationOn.svg';
import { StyleSheet } from 'react-native';
import { sizes } from '../../shared/theme/sizes';
import { fonts } from '../../shared/theme/fonts';
import { colors } from './colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const buttonList = [
  {
    width: 15,
    height: 15,
    x: 0,
    y: 0,
    title: 'home.show_news',
    redirection: 'NewsList',
    getIcon: on =>
      on ? <NewsIconWhite style={styles.iconStyle} /> : <NewsIcon style={styles.iconStyle} fill={colors.mainColor} />,
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 0,
    title: 'home.show_agenda',
    redirection: 'Agenda',
    getIcon: on =>
      on ? (
        <AgendaIconWhite style={styles.iconStyle} />
      ) : (
        <AgendaIcon style={styles.iconStyle} fill={colors.mainColor} />
      ),
  },
  {
    width: 15,
    height: 15,
    x: 0,
    y: 16,
    title: 'home.show_weather',
    redirection: 'NewsList',
    getIcon: on =>
      on ? (
        <WeatherIconWhite style={styles.iconStyle} />
      ) : (
        <WeatherIcon style={styles.iconStyle} fill={colors.mainColor} />
      ),
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 16,
    title: 'home.show_map',
    redirection: 'Map',
    getIcon: on =>
      on ? (
        <LocationIconWhite style={styles.iconStyle} />
      ) : (
        <LocationIcon style={styles.iconStyle} fill={colors.mainColor} />
      ),
  },
  {
    width: 15,
    height: 15,
    x: 0,
    y: 32,
    title: 'home.show_recycling',
    redirection: 'Recycling',
    getIcon: on =>
      on ? (
        <Fontisto name="recycle" size={90} color="white" style={styles.iconStyle} />
      ) : (
        <Fontisto name="recycle" size={90} color={colors.mainColor} style={styles.iconStyle} />
      ),
  },
  {
    width: 15,
    height: 15,
    x: 16,
    y: 32,
    title: 'home.show_ask',
    redirection: 'NewsList',
    getIcon: on =>
      on ? (
        <MaterialIcons name="contact-support" size={90} color="white" style={styles.iconStyle} />
      ) : (
        <MaterialIcons name="contact-support" size={90} color={colors.mainColor} style={styles.iconStyle} />
      ),
  },
];

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 100,
    height: 100,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: sizes.large,
    color: 'black',
  },
});
