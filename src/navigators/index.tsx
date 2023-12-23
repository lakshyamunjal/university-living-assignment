import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, TimerScreen, WorldClockScreen} from '../screens';

import {AppStackParamList} from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="timer" component={TimerScreen} />
      <Stack.Screen name="worldClock" component={WorldClockScreen} />
    </Stack.Navigator>
  );
};

export {StackNavigator};
