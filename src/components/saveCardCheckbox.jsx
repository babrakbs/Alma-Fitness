import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const SaveCardCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => setIsChecked(!isChecked);

    return (
        <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
            <CheckBox
                value={isChecked}
                tintColor="#DBDCDB"
                tintColors={{ false: '#DBDCDB', true: '#15161E' }}
                onValueChange={toggleCheckbox}
            />
            <Text style={styles.label}>Save card for later use.</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    checkboxIcon: {
        width: 25,
        aspectRatio: 1.04,
        marginRight: 9,
    },
    label: {
        color: "#3A3A3A",
        fontSize: 14,
         
        fontFamily: 'Inter Tight, sans-serif',
    },
});

export default SaveCardCheckbox;