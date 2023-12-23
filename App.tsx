import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {StackNavigator} from './src/navigators';

import {store} from './src/store';

import {styles} from './App.styles';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
