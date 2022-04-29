import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from '../../../config/config';
import I18n from '../../../config/locales';
import { sizes } from '../../../shared/theme/sizes';
import { RecyclingStore } from '../RecyclingStore';
import { FilterIcon } from './FilterIcon';
import { MODAL_HEIGHT, MODAL_WIDTH } from '../../map/component/ModalFilter';

type Props = {
  showOverlay: boolean;
  onOverlayChange: Dispatch<SetStateAction<boolean>>;
  recyclingStore: RecyclingStore;
};

export const ModalFilter = inject('recyclingStore')(
  observer((props: Props) => {
    const { showOverlay, onOverlayChange, recyclingStore } = props;
    const { recyclingCenters } = recyclingStore;
    const categories = Object.getOwnPropertyNames(recyclingCenters[0].selecting).map(category => {
      return { name: category, check: false };
    });
    const [overlayCategories, setOverlayCategories] = useState(categories);

    const countCenters = () => {
      let count = 0;
      recyclingCenters.forEach(recyclingCenter => {
        if (overlayCategories.some(category => category.check)) {
          const selectingArray = Object.values(recyclingCenter.selecting);
          count += overlayCategories.some((category, index) => category.check && !selectingArray[index]) ? 0 : 1;
        }
      });
      return count;
    };

    return (
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={showOverlay}
        animationType="fade"
        onBackdropPress={() => {
          recyclingStore.filterCategories(overlayCategories);
          onOverlayChange(false);
          setOverlayCategories(categories);
        }}
      >
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          {overlayCategories.map(category => {
            return (
              <FilterIcon
                key={category.name}
                category={category}
                overlayCategories={overlayCategories}
                setOverlayCategories={setOverlayCategories}
              />
            );
          })}
        </ScrollView>
        <View style={styles.numberEvents}>
          <EvilIcons name="chevron-right" size={20} color={colors.mainColor} />
          <Text style={{ color: colors.mainColor }}>{countCenters() + ' ' + I18n.t('agenda.event_find')}</Text>
        </View>
        <TouchableOpacity
          style={styles.validateFilter}
          onPress={() => {
            recyclingStore.filterCategories(overlayCategories);
            onOverlayChange(false);
            setOverlayCategories(categories);
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
    height: MODAL_HEIGHT,
    width: MODAL_WIDTH,
    borderRadius: 15,
  },
  listCategories: {
    width: '100%',
    zIndex: 1,
  },
  checkBox: {
    backgroundColor: colors.background,
    color: colors.mainColor,
  },
  buttonContainer: {
    flex: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
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
