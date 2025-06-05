import React from 'react';
import {StyleSheet, View, ScrollView, Text, StatusBar} from 'react-native';
import Header from '../../../components/header';
import { TermsData } from '../../../constants/staticData';
import TermSection from '../../../components/termSection';
import { fontFamily } from '../../../constants';

const TermsCondition = () => {
    return (
        <ScrollView style={[styles.container]}>
            <View style={styles.content}>
                <Header label={'Terms & Conditions        '} showArrow={true} />
                {TermsData.map((section, index) => (
                    <TermSection key={index} title={section.title} content={section.content} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 245, 1)',
      },
      content: {
        width: '90%',
        marginHorizontal: '5%'
      },
      titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 39,
        marginBottom: 35,
      },
      titleIcon: {
        width: 32,
        height: 32,
        marginRight: 20,
      },
      title: {
        color: '#15161E',
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'Inter Tight, sans-serif',
      },
      footer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        paddingHorizontal: 79,
      },
      footerBar: {
        width: 134,
        height: 5,
        backgroundColor: '#A2A5B1',
        borderRadius: 100,
      },
});

export default TermsCondition;