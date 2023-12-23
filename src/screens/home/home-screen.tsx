import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button} from '../../components';

import {HomeScreenProp} from './types';

import {styles} from './home-screen.styles';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();

  const handleNavigation = (route: 'timer' | 'worldClock') => () => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.timerBtnContainer}
        handlePress={handleNavigation('timer')}
        text="Go to Timer"
      />
      <Button
        handlePress={handleNavigation('worldClock')}
        text="Go to World Clock"
      />
    </View>
  );
};

export {HomeScreen};
