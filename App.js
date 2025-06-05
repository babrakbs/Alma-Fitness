import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigations/auth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Store} from './src/Redux/store';
import {Provider} from 'react-redux';424242
import persistStore from 'redux-persist/es/persistStore';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import { StripeProvider } from '@stripe/stripe-react-native';
import {Publishable_key} from '@env'
// export default function App() {
//   let isSigned = false;
//   let persistor = persistStore(Store);

//   return (
//     // <Provider>
//     <GestureHandlerRootView style={{flex: 1, height: '100%'}}>
//       <BottomSheetModalProvider>
//       <Provider store={Store}>
//       <PersistGate persistor={persistor}>

//         <NavigationContainer>
//           <AuthStack />
//         </NavigationContainer>
//         </Provider>
//         </PersistGate>

//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// }
let persistor = persistStore(Store);
const App = () => {
  console.log(Publishable_key);
  
  return (
    <StripeProvider publishableKey={Publishable_key}>
      <SafeAreaView style={styles.container}>
        {/* <StatusBar backgroundColor={colors.primary} /> */}
        {/* <StatusBar hidden={true} /> */}
        <Provider store={Store}>
          <PersistGate persistor={persistor}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NavigationContainer>
                <AuthStack />
              </NavigationContainer>
            </GestureHandlerRootView>
            {/* <Notifications /> */}
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </StripeProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
});
export default App;
