import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const OnBoardingProgress = ({screen}) => {
    console.log(screen);
    let progressNum = [1,2,3];
    return(
        <View style={styles.container}>
            {
                progressNum.map((item, index) => {
                    return(
                        <View key={index} style={index == screen ? styles.dotSelected : styles.dotNotSelected}></View>
                    );
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 1,
        width: 200,
        justifyContent:'space-between',
        marginVertical:heightPercentageToDP(3.6),
        // marginTop: 30,
        // marginBottom: 20,
        alignItems:'center',
        alignSelf:'flex-start',
        backgroundColor:colors.darkWhite,
        marginHorizontal:20
    },
    dotSelected: {
        height: 1,
        width: 60,
        backgroundColor: colors.white,
        borderRadius: 30,
        // inactive's background color:  #DBDCDB
    },
    dotNotSelected: {
        // height: 5.71,
        // width: 5.71,
        // backgroundColor: '#DBDCDB',
        // borderRadius: 20,
    }
});

export default OnBoardingProgress;
