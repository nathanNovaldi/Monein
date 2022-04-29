import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import I18n from '../../config/locales';
import { colors } from '../../config/config';
import { fonts } from '../../shared/theme/fonts';
import { sizes } from '../../shared/theme/sizes';
import { AgendaStore } from './AgendaStore';
import { WINDOW_WIDTH } from '../../shared/Variables';
import RenderHtml from 'react-native-render-html';

type Props = {
  route: any;
  agendaStore: AgendaStore;
};

export const AgendaDetailScreen = inject('agendaStore')(
  observer((props: Props) => {
    const { route, agendaStore } = props;
    const { agendaEventId } = route.params;
    const agendaEvent = agendaStore.getAgendaEvent(agendaEventId);

    const navigation = useNavigation();

    const addToAgenda = () => {
      if (agendaEvent) {
        const eventConfig = {
          title: agendaEvent.title,
          startDate: agendaEvent.dateStart.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
          endDate: agendaEvent.dateEnd.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
          location: agendaEvent.address,
          url: agendaEvent.link,
          notes: agendaEvent.description,
        };
        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
          .then((createResult: AddCalendarEvent.CreateResult) => {
            if (createResult.action === 'SAVED') {
              Toast.show({
                type: 'success',
                text1: 'Agenda',
                text2: 'Evenement correctement ajouté',
                position: 'bottom',
              });
            }
          })
          .catch(() => {
            Toast.show({ type: 'error', text1: 'Agenda', text2: "Erreur lors de l'ajout", position: 'bottom' });
          });
      }
    };

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <FontAwesome
            name="calendar-plus-o"
            size={25}
            color={colors.background}
            style={styles.addAgendaIcon}
            onPress={() => {
              addToAgenda();
            }}
          />
        ),
      });
    });

    const majusculeMonth = (month: string) => {
      return (month + '').charAt(0).toUpperCase() + month.substr(1);
    };

    if (agendaEvent) {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {agendaEvent.dateStart.isSame(agendaEvent.dateEnd, 'day') ? (
              <View style={styles.dateContainer}>
                <Text style={styles.day}>{agendaEvent.dateStart.format('DD')}</Text>
                <Text style={styles.month}>{majusculeMonth(agendaEvent.dateStart.format('MMM'))}</Text>
              </View>
            ) : (
              // eslint-disable-next-line react-native/no-inline-styles
              <View style={{ ...styles.dateContainer, width: 140, flexDirection: 'row' }}>
                <View style={styles.groupDate}>
                  <Text style={styles.day}>{agendaEvent.dateStart.format('DD')}</Text>
                  <Text style={styles.month}>{majusculeMonth(agendaEvent.dateStart.format('MMM'))}</Text>
                </View>
                <View style={styles.dateSeparator} />
                <View style={styles.groupDate}>
                  <Text style={styles.day}>{agendaEvent.dateEnd.format('DD')}</Text>
                  <Text style={styles.month}>{majusculeMonth(agendaEvent.dateEnd.format('MMM'))}</Text>
                </View>
              </View>
            )}
            <Image source={{ uri: agendaEvent.imageUrl }} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{agendaEvent.title}</Text>
            <Text style={styles.category}>
              {agendaEvent.category.map(item => {
                return item + ' ';
              })}
            </Text>
            <Text style={styles.city}>{agendaEvent.city}</Text>
            <View style={styles.line} />
            <RenderHtml
              containerStyle={styles.detail}
              contentWidth={WINDOW_WIDTH}
              source={{ html: agendaEvent.description }}
              ignoredStyles={['font-family']}
              baseFontStyle={{ fontFamily: fonts.regular }}
            />
            {agendaEvent.address !== undefined && (
              <View style={styles.contact}>
                <Entypo name="address" size={20} style={styles.urlIcon} />
                <Text style={styles.detail}>
                  {agendaEvent.address
                    ? agendaEvent.address + ' , ' + agendaEvent.city
                    : I18n.t('agenda.address_not_found')}
                </Text>
              </View>
            )}
            {agendaEvent.price !== undefined && (
              <View style={styles.contact}>
                <FontAwesome name="euro" size={20} style={styles.urlIcon} />
                <Text style={styles.detail}>
                  {agendaEvent.price ? agendaEvent.price : I18n.t('agenda.price_not_found')}
                </Text>
              </View>
            )}
            {(agendaEvent.link !== undefined || agendaEvent.contact !== undefined) && <View style={styles.line} />}
            {(agendaEvent.link !== undefined || agendaEvent.contact !== undefined) && (
              <Text style={styles.city}>{I18n.t('agenda.contact')}</Text>
            )}
            {agendaEvent.link !== undefined && (
              <View style={styles.contact}>
                <Feather name="link" size={20} style={styles.urlIcon} />
                <Text style={styles.detail} onPress={() => Linking.openURL(agendaEvent.link)}>
                  {agendaEvent.link};
                </Text>
              </View>
            )}
            {agendaEvent.contact !== undefined && (
              <View style={styles.contact}>
                <FontAwesome name="phone" size={20} style={styles.contactIcon} />
                {agendaEvent.contact ? (
                  <Text onPress={() => Linking.openURL(`tel:${agendaEvent.contact}`)}>{agendaEvent.contact};</Text>
                ) : (
                  <Text onPress={() => Linking.openURL(`tel:+33 5 59 00 00 00`)}>+33 5 59 00 00 00</Text>
                )}
              </View>
            )}
            {(agendaEvent.link !== undefined || agendaEvent.contact !== undefined) && <View style={styles.line} />}
          </ScrollView>
        </SafeAreaView>
      );
    }
    return null;
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  addAgendaIcon: {
    marginRight: 25,
  },
  dateContainer: {
    position: 'absolute',
    backgroundColor: colors.mainColor,
    zIndex: 20,
    top: 120,
    left: 10,
    height: 70,
    width: 70,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSeparator: {
    width: 8,
    height: 5,
    backgroundColor: colors.textLight,
    borderRadius: 2,
    marginLeft: 5,
    marginRight: 10,
  },
  groupDate: {
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  day: {
    color: colors.textLight,
    fontFamily: fonts.bold,
    fontSize: sizes.xxlarge,
  },
  month: {
    color: colors.textLight,
    fontFamily: fonts.bold,
    fontSize: sizes.large,
  },
  image: {
    height: 200,
    width: '100%',
  },
  title: {
    marginTop: 8,
    marginLeft: 15,
    width: '90%',
    fontFamily: fonts.bold,
    fontSize: sizes.xlarge,
  },
  category: {
    fontSize: sizes.large,
    color: colors.darkGrey,
    width: '90%',
    marginLeft: 15,
    marginTop: 5,
  },
  city: {
    color: colors.mainColor,
    marginTop: 3,
    marginLeft: 15,
  },
  detail: {
    marginTop: 25,
    alignSelf: 'center',
    width: '90%',
  },
  contact: {
    marginVertical: 15,
    marginLeft: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  urlIcon: {
    marginRight: 8,
    marginTop: 10,
  },
  contactIcon: {
    marginRight: 8,
  },
  line: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: colors.lightGrey,
    height: 1,
    marginVertical: 15,
  },
});
