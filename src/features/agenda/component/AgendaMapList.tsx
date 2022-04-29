import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Interactable from 'react-native-interactable';
import { AgendaStore } from '../AgendaStore';
import { AgendaMapCard, CARD_HEIGHT, CARD_WIDTH } from './AgendaMapCard';

type Props = {
  agendaStore: AgendaStore;
  mapAnimation: Animated.Value;
};

export const OPEN_POSITION_Y = 0;
export const CLOSE_POSITION_Y = CARD_HEIGHT - 40;

export class AgendaMapList extends React.Component<Props> {
  flatListRef: any | null;

  interactableRef: any | null;

  _deltaX = new Animated.Value(0);

  _deltaY = new Animated.Value(CLOSE_POSITION_Y);

  scrollToIndex = (index: number) => {
    setTimeout(() => {
      if (this.flatListRef) {
        this.flatListRef.scrollToIndex({ animated: true, index, viewPosition: 0.5 });
      }
    }, 500);
  };

  displayList = (display: Boolean) => {
    const index = display ? 0 : 1;
    setTimeout(() => {
      if (this.interactableRef) {
        this.interactableRef.snapTo({ index });
      }
    }, 300);
  };

  render() {
    const { agendaStore, mapAnimation } = this.props;
    const { filteredAgenda } = agendaStore;

    return (
      <View style={styles.containerList} pointerEvents="box-none">
        <Interactable.View
          ref={ref => {
            this.interactableRef = ref;
          }}
          verticalOnly={true}
          initialPosition={{ y: CLOSE_POSITION_Y }}
          snapPoints={[{ y: OPEN_POSITION_Y }, { y: CLOSE_POSITION_Y }]}
          animatedValueX={this._deltaX}
          animatedValueY={this._deltaY}
        >
          <Animated.FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            snapToAlignment="center"
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: mapAnimation } } }], {
              useNativeDriver: true,
            })}
            data={filteredAgenda}
            getItemLayout={(data, index) => ({ length: CARD_WIDTH, offset: CARD_WIDTH * index, index })}
            renderItem={({ item }) => {
              return <AgendaMapCard item={item} />;
            }}
          />
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    position: 'absolute',
    height: CARD_HEIGHT,
  },
});
