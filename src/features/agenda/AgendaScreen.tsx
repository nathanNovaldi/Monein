import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlipComponent from 'react-native-flip-component';
import { agendaStore } from './AgendaStore';
import { AgendaList } from './component/AgendaList';
import { AgendaMap } from './component/AgendaMap';
import { ModalFilter } from './component/ModalFilter';
import { AgendaHeaderDate } from './component/AgendaHeaderDate';
import { AGENDA_MAP_ENABLED, colors } from '../../config/config';

export const AgendaScreen = () => {
  const [mapVisible, setMapVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [overlayFilter, setOverlayFilter] = useState<boolean>(false);
  const buttonOpacity = new Animated.Value(1);

  useEffect(() => {
    if (!agendaStore.agenda || !agendaStore.agenda.length) {
      agendaStore.fetchAll();
    }
    buttonOpacity.addListener(state => {
      state.value <= 0.1 ? setButtonVisible(false) : setButtonVisible(true);
    });
  });

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome5
          name="filter"
          size={20}
          color={colors.navBarIconColor}
          style={styles.filterIcon}
          onPress={() => {
            setOverlayFilter(true);
          }}
        />
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ModalFilter showOverlay={overlayFilter} onOverlayChange={setOverlayFilter} agendaStore={agendaStore} />
      <AgendaHeaderDate agendaStore={agendaStore} isMap={mapVisible} />
      {AGENDA_MAP_ENABLED ? (
        <FlipComponent
          isFlipped={mapVisible}
          containerStyles={styles.flipContainer}
          frontView={<AgendaList agendaStore={agendaStore} />}
          frontStyles={styles.flipContainer}
          backView={<AgendaMap agendaStore={agendaStore} buttonOpacity={buttonOpacity} />}
          backStyles={styles.backFlip}
        />
      ) : (
        <AgendaList agendaStore={agendaStore} />
      )}
      {AGENDA_MAP_ENABLED && buttonVisible && (
        <Animated.View style={{ ...styles.buttonContainer, opacity: buttonOpacity }}>
          <TouchableOpacity
            onPress={() => {
              setMapVisible(false);
            }}
            style={styles.buttonStyle}
          >
            <Ionicons name="menu" size={35} color={mapVisible ? colors.darkGrey : colors.mainColor} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => {
              setMapVisible(true);
            }}
            style={styles.buttonStyle}
          >
            <FontAwesome5 name="map-marker-alt" size={25} color={mapVisible ? colors.mainColor : colors.darkGrey} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flipContainer: {
    flex: 1,
  },
  backFlip: {
    width: '100%',
    height: '103%',
  },
  filterIcon: {
    marginRight: 25,
  },
  filterModal: {
    width: 4,
    height: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 60,
    width: 121,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonStyle: {
    width: 60,
    height: 60,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: colors.darkGrey,
  },
});
