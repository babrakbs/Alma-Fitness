import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../../../components/header';
import FAQSection from '../../../components/FaqSection';
import Button from '../../../components/Button';

const FAQ = () => {
    return (
        <>
            <ScrollView style={styles.container}>
                <Header label={'Support'} showArrow />
                <View style={styles.titleContainer}>
                    <View style={styles.titleBar} />
                    <Text style={styles.title}>Frequently Asked Questions</Text>
                </View>
                <FAQSection />
                <Text style={styles.helpCentreLink}>
                    For more detailed information, visit our{' '}
                    <Text style={styles.helpCentreText}>Help Centre.</Text>
                </Text>
            </ScrollView>
            <View style={styles.buttonCont}>
                <Button text='Contact Us' theme='blackWhite' />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 15,
    },
    titleBar: {
        backgroundColor: '#15161E',
        width: 3,
        height: 18,
        marginRight: 6,
    },
    title: {
        color: '#15161E',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter Tight',
    },
    helpCentreLink: {
        color: '#15161E',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter Tight',
        marginTop: 8,
    },
    helpCentreText: {
        textDecorationLine: 'underline',
        fontWeight: '700',
    },
    footer: {
        backgroundColor: '#DBDCDB',
        height: 5,
        width: 134,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 39,
    },
    buttonCont: {
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: 30
    }
});

export default FAQ;