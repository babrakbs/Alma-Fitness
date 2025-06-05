import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fontFamily } from '../constants';

const MembershipSpecificButton = ({label, clickable, handleClick, marginTop}) => {
    return (
        <Pressable 
        onPress={handleClick}
        style={[styles.container, {marginTop: marginTop}]}>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        // backgroundColor: 'red',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 100,
        alignItems:'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        fontFamily:fontFamily.medium
    }
});

export default MembershipSpecificButton;
