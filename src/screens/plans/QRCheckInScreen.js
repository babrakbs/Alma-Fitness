import React, { useRef, useMemo } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const QRCheckInScreen = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['45%'], []);

  return (
    <ImageBackground
      source={require("../../assets/images/OnB1.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleComponent={null}
        backgroundStyle={styles.sheetBackground}
      >
        {/* <YourCheckInComponent /> */}
      </BottomSheet>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  sheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default QRCheckInScreen;
