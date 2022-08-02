/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
// import { Metrics } from './src/global/constants/Metrics';
import NetInfo from '@react-native-community/netinfo';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// import store from './src/redux/store';
// import AppContainer from './src';
import AppContainer from './src/screens/initial';
import configureStore from './src/redux/store';
// import Sentry from 'sentry-expo';
import * as Sentry from 'sentry-expo';

const { store, persistor } = configureStore();

Sentry.init({
  dsn: 'https://788c238b5278432684060ef8192aa705@sentry.io/5175819',
  enableInExpoDevelopment: true,
  debug: true,
});
// Sentry.config('https://788c238b5278432684060ef8192aa705@sentry.io/5175819').install();
const App = () => {
  const [ready, setReady] = useState(false);
  const [type, setType] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const loadAsync = async () => {
    await Font.loadAsync({
      icomoon: require('./assets/fonts/icomoon.ttf'),
      mukta: require('./assets/fonts/Mukta-Regular.ttf'),
      sfprodisplayRegular: require('./assets/fonts/SFProDisplay-Regular.otf'),
      sfprotextRegular: require('./assets/fonts/SFProText-Regular.otf'),
      sfprotextSemibold: require('./assets/fonts/SFProText-Semibold.otf'),
    });
    setReady(true);
  };

  const unsubscribe = () =>
    NetInfo.addEventListener((state) => {
      setType(state.type);
      setIsConnected(state.isConnected);
    });

  useEffect(() => {
    // Sentry.captureException(new Error('Oops!'));
    loadAsync();
    unsubscribe();
  }, []);

  if (!ready) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      {/* <SafeAreaView style={{ marginTop: Platform.OS === 'ios' ? 0 : 20, backgroundColor: '#fff' }} /> */}
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <AppContainer />
        {isConnected === false ? (
          <View
            style={{
              backgroundColor: '#F2CDD4',
              width: '100%',
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 30,
            }}
          >
            <Text style={{ color: '#FF3B30', fontSize: 14 }}>
              No Internet Connection !
            </Text>
          </View>
        ) : null}
      </PersistGate>
    </Provider>
  );
};
export default App;
