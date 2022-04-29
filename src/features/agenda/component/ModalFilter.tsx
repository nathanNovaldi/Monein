import React, { Dispatch, SetStateAction, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { CheckBox, Overlay } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from '../../../config/config';
import { AgendaStore } from '../AgendaStore';
import { fonts } from '../../../shared/theme/fonts';
import I18n from '../../../config/locales';
import { sizes } from '../../../shared/theme/sizes';
import { AgendaEvent } from '../AgendaEvent';

type Props = {
  showOverlay: boolean;
  onOverlayChange: Dispatch<SetStateAction<boolean>>;
  agendaStore: AgendaStore;
};

export const ModalFilter = inject('agendaStore')(
  observer((props: Props) => {
    const { showOverlay, onOverlayChange, agendaStore } = props;
    const { filteredAgenda, categories } = agendaStore;
    const [overlayCategories, setOverlayCategories] = useState(categories);

    const countEvents = (agenda: Array<AgendaEvent>) => {
      let count = 0;
      agenda.forEach(agendaEvent => {
        overlayCategories.forEach(category => {
          count += agendaEvent.category.includes(category.name) && category.check ? 1 : 0;
        });
      });

      return count;
    };

    return (
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={showOverlay}
        animationType="fade"
        onBackdropPress={() => {
          agendaStore.changeCategories(overlayCategories);
          onOverlayChange(false);
        }}
      >
        <View style={styles.selectAll}>
          <TouchableOpacity
            onPress={() => {
              setOverlayCategories(
                overlayCategories.map(category => {
                  return { ...category, check: true };
                }),
              );
            }}
          >
            <Text style={styles.textSelect}>{I18n.t('filter.selectAll')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOverlayCategories(
                overlayCategories.map(category => {
                  return { ...category, check: false };
                }),
              );
            }}
          >
            <Text style={styles.textSelect}>{I18n.t('filter.deselectAll')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <FlatList
          style={styles.listCategories}
          data={overlayCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <CheckBox
                checkedColor={colors.mainColor}
                containerStyle={styles.checkBox}
                title={item.name}
                checked={overlayCategories[index].check}
                onPress={() => {
                  setOverlayCategories(
                    overlayCategories.map((category, ind) => {
                      return ind === index ? { ...category, check: !category.check } : category;
                    }),
                  );
                }}
              />
            );
          }}
        />
        <View style={styles.numberEvents}>
          <EvilIcons name="chevron-right" size={20} color={colors.mainColor} />
          <Text style={{ color: colors.mainColor }}>
            {countEvents(filteredAgenda) + ' ' + I18n.t('agenda.event_find')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.validateFilter}
          onPress={() => {
            agendaStore.changeCategories(overlayCategories);
            onOverlayChange(false);
          }}
        >
          <Text style={styles.validateText}>{I18n.t('filter.validate')}</Text>
        </TouchableOpacity>
      </Overlay>
    );
  }),
);

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.background,
    alignSelf: 'center',
    height: '60%',
    width: '80%',
    borderRadius: 15,
  },
  listCategories: {
    width: '100%',
    zIndex: 1,
  },
  separator: {
    width: '92%',
    height: 1,
    backgroundColor: 'black',
    opacity: 0.3,
    alignSelf: 'center',
    marginTop: 8,
  },
  checkBox: {
    backgroundColor: colors.background,
    color: colors.mainColor,
  },
  selectAll: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textSelect: {
    fontFamily: fonts.semiBoldItalic,
    fontSize: sizes.small,
    color: colors.darkGrey,
  },
  numberEvents: {
    marginTop: 5,
    marginLeft: '5%',
    flexDirection: 'row',
  },
  validateFilter: {
    marginTop: 7,
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  validateText: {
    fontSize: sizes.xlarge,
    color: 'white',
    alignSelf: 'center',
  },
});
