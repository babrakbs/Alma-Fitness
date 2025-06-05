import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';

import {
  BottomSheetBackdrop,
  //   BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  // useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ActionSheetTest = () => {
  const [showSheet, setShowSheet] = useState(false);
  const bottomSheetModalRef = useRef();

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handlePresentModalPress = useCallback(() => {
    console.log('PREEE', bottomSheetModalRef);
    // setShowSheet(true);

    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{flex: 1, width: '95%', margin: 'auto'}}>
      <Button
        title="OPen"
        onPress={() => {
          handlePresentModalPress();
        }}
      />
      <GestureHandlerRootView style={{flex: 1, height: '100%'}}>
        <BottomSheetModalProvider>
          {/* <Button title="Open" onPress={handlePresentModalPress} /> */}

          <BottomSheetModal
            backgroundStyle={{backgroundColor: 'yellow'}}
            // backdropComponent={<BottomSheetBackdrop />}
            // backgroundComponent={<BottomSheetBackdrop />}
            backdropComponent={props => (
              <BottomSheetBackdrop
                {...props}
                opacity={0.2}
                enableTouchThrough={true}
              />
            )}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <BottomSheetView style={{flex: 1}}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>

          {/* {showSheet && (
            <BottomSheet index={1} snapPoints={snapPoints}>
              <View style={styles.contentContainer}>
                <Text style={styles.containerHeadline}>
                  Awesome Bottom Sheet 🎉
                </Text>
              </View>
            </BottomSheet>
          )} */}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default ActionSheetTest;

const styles = StyleSheet.create({});
