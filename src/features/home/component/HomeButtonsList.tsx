import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WINDOW_WIDTH } from '../../../shared/Variables';
import { HomeSpec } from '../HomeSpec';
import { HomeButton } from './HomeButton';

export const NUMBER_CELLS = 31;
export const HOMECELL_WIDTH = (WINDOW_WIDTH - 20) / NUMBER_CELLS;

type Props = {
  buttonsList: Array<any>;
};

export const HomeButtonsList = (props: Props) => {
  const { buttonsList } = props;

  const calculateHeightMax = () => {
    let heightMax = 0;
    buttonsList.forEach(
      (button: HomeSpec) => (heightMax = Math.max(heightMax, (button.height + button.y) * HOMECELL_WIDTH)),
    );
    return heightMax;
  };

  return (
    <View style={[styles.buttonContainer, { height: calculateHeightMax() }]}>
      {buttonsList.map((button: HomeSpec) => {
        return <HomeButton key={button.title} button={button} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    width: WINDOW_WIDTH - 20,
    alignSelf: 'center',
    top: 20,
    marginBottom: 50,
  },
});
