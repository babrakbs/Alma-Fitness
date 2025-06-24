// QRScanScreen.js
import React, { useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';

const QRScanScreen = () => {
  const navigation = useNavigation();

  const handleScanSuccess = useCallback((e) => {
    const qrData = e.data;
    navigation.replace('QRCheckInScreen', { qrData });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <QRCodeScanner
        onRead={handleScanSuccess}
        reactivate={false}
        showMarker
        fadeIn
        topViewStyle={styles.hidden}
        bottomViewStyle={styles.hidden}
        cameraStyle={styles.camera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    height: '100%',
  },
  hidden: {
    height: 0,
    flex: 0,
  },
});

export default QRScanScreen;
