import React, { Dispatch, SetStateAction, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CheckBox, Overlay } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { colors } from '../../../config/config';
import I18n from '../../../config/locales';
import { sizes } from '../../../shared/theme/sizes';
import { agendaStore } from '../../agenda/AgendaStore';
import { recyclingStore } from '../../recycling/RecyclingStore';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../../shared/Variables';
import { markersStore } from '../MarkersStore';

type Props = {
  showOverlay: boolean;
  onOverlayChange: Dispatch<SetStateAction<boolean>>;
  stores: Array<any>;
};

export const MODAL_WIDTH = WINDOW_WIDTH * 0.8;
export const MODAL_HEIGHT = WINDOW_HEIGHT * 0.6;

export const ModalFilter = inject('markersStore')(
  observer((props: Props) => {
    const { showOverlay, onOverlayChange, stores } = props;
    const categories: Array<{ name: string; check: boolean }> = stores
      .map(store => {
        return store === agendaStore
          ? I18n.t('filter.agenda')
          : store === recyclingStore
          ? I18n.t('filter.recycling')
          : store === markersStore
          ? I18n.t('filter.markers')
          : null;
      })
      .map(category => {
        return { name: category, check: false };
      });
    const [overlayCategories, setOverlayCategories] = useState(categories);

    return (
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={showOverlay}
        animationType="fade"
        onBackdropPress={() => {
          onOverlayChange(false);
        }}
      >
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
        <TouchableOpacity
          style={styles.validateFilter}
          onPress={() => {
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
