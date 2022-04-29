import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../config/config';
import { AgendaStore } from '../AgendaStore';
import { AgendaItem } from './AgendaItem';
import { fonts } from '../../../shared/theme/fonts';
import { sizes } from '../../../shared/theme/sizes';

type Props = {
  agendaStore: AgendaStore;
};

export const AgendaList = inject('agendaStore')(
  observer((props: Props) => {
    const { agendaStore } = props;
    const { filteredAgenda } = agendaStore;
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        {filteredAgenda.length !== 0 ? (
          <FlatList
            style={styles.list}
            data={filteredAgenda}
            renderItem={({ item }) => {
              return (
                <AgendaItem
                  agendaEvent={item}
                  onPress={() => navigation.navigate('AgendaDetail', { agendaEventId: item.id })}
                />
              );
            }}
          />
        ) : (
          <View style={styles.empty}>
            <MaterialIcons name="report-problem" size={80} color={colors.mainColor} />
            <Text style={styles.emptyText}>Oups ..!</Text>
            <Text style={styles.emptyText}>Aucun Evènement prévu</Text>
          </View>
        )}
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
  buttonStyle: {
    zIndex: 1,
    position: 'absolute',
    width: '20%',
    height: 60,
    borderRadius: 50,
    alignSelf: 'flex-end',
    bottom: 20,
    right: 20,
    backgroundColor: colors.mainColor,
  },
  icon: {
    top: 7,
    alignSelf: 'center',
  },
  empty: {
    width: '80%',
    top: '35%',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fonts.bold,
    fontSize: sizes.large,
  },
});
