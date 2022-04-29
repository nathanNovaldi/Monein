import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../config/config';
import I18n from '../../../config/locales';
import { fonts } from '../../../shared/theme/fonts';
import { sizes } from '../../../shared/theme/sizes';
import { WINDOW_WIDTH } from '../../../shared/Variables';
import { AgendaStore } from '../AgendaStore';

type Props = {
  agendaStore: AgendaStore;
  isMap: Boolean;
};

export const AgendaHeaderDate = (props: Props) => {
  const { agendaStore, isMap } = props;
  const { filterDate, dates } = agendaStore;

  const [highlight, setHighlight] = useState(() => {
    return dates.findIndex(date => date[0].isSame(filterDate[0]) && date[1].isSame(filterDate[1]));
  });

  return (
    <View style={isMap ? styles.buttons : { ...styles.buttons, backgroundColor: colors.background }}>
      <TouchableOpacity
        style={highlight === 0 ? styles.buttonSelectedStyle : styles.buttonStyle}
        onPress={() => {
          setHighlight(0);
          agendaStore.changeDate(dates[0]);
        }}
      >
        <Text style={highlight === 0 ? styles.textDate : styles.textDateSelected}>{I18n.t('agenda.this_week')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={highlight === 1 ? styles.buttonSelectedStyle : styles.buttonStyle}
        onPress={() => {
          setHighlight(1);
          agendaStore.changeDate(dates[1]);
        }}
      >
        <Text style={highlight === 1 ? styles.textDate : styles.textDateSelected}>{I18n.t('agenda.next_week')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={highlight === 2 ? styles.buttonSelectedStyle : styles.buttonStyle}
        onPress={() => {
          setHighlight(2);
          agendaStore.changeDate(dates[2]);
        }}
      >
        <Text style={highlight === 2 ? styles.textDate : styles.textDateSelected}>{I18n.t('agenda.this_month')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    top: 0,
    height: 45,
    zIndex: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonStyle: {
    height: '80%',
    width: WINDOW_WIDTH / 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelectedStyle: {
    height: '90%',
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    width: WINDOW_WIDTH / 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDate: {
    color: colors.textLight,
    fontSize: sizes.small,
    fontFamily: fonts.bold,
  },
  textDateSelected: {
    color: colors.textDark,
    fontSize: sizes.small,
    fontFamily: fonts.regular,
  },
});
