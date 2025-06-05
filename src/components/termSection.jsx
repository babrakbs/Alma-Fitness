import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, fontFamily } from '../constants';


const TermSection = ({ title, content }) => {
  return (
    <View style={styles.section}>
        {
            title ? 
            <Text style={styles.sectionTitle}>{title}</Text>:<View />
        }
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
    marginBottom: 10
  },
  sectionContent: {
    color: colors.darkWhite,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamily.regular,
  },
});

export default TermSection;