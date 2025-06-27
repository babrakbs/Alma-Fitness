import React, {useRef, useMemo, useState} from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import ClassesCard from '../../components/Home/ClassesCardAttached';
import {colors, fontFamily} from '../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import BlueBgComponent from '../../components/BlueBgComponent';

const QRCheckInScreen = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['45%'], []);
  const [showSuccess, setShowSuccess] = useState(false);

  // Placeholder user data
  const username = 'John Doe';
  const userNumber = '+1234567890';

  const handleCardPress = () => {
    // Close the bottom sheet and show the success layout
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <BlueBgComponent
        heading="You're in!"
        description={`Full Body & Bands\nAREA Athens`}
        isIcon={false}
        bottomButton={true}
        showProfile={true}
        btnText="Continue"
        profileName={'Mark Ibrahim'}
        profileNumber={'#123123'}
        onPressBtn={() => navigation.navigate('PaymentDetails')}
        theme="blackWhite"
      />
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/OnB1.png')}
      style={styles.background}
      resizeMode="cover">
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleComponent={null}
        backgroundStyle={styles.sheetBackground}>
        <BottomSheetView style={styles.layout}>
          <View style={styles.dragThumbContainer}>
            <View style={styles.dragThumb} />
          </View>
          <Text style={styles.headerText}>Check In</Text>
          <ClassesCard onPressCard={handleCardPress} />
        </BottomSheetView>
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
  layout: {
    width: '90%',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    marginVertical: heightPercentageToDP(2),
  },
  dragThumbContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  dragThumb: {
    width: 96,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DADADA',
  },
});

export default QRCheckInScreen;
