import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { ArrowDownBlackIcon } from '../constants/svgs';

const FAQItem = ({ question, answer, expanded, onPress }) => {
  return (
    <View style={[styles.container, expanded && styles.expandedContainer]}>
      <Pressable style={styles.questionContainer} onPress={onPress}>
        <Text style={styles.questionText}>{question}</Text>
        <ArrowDownBlackIcon />
      </Pressable>
      {expanded && (
        <>
          <View style={styles.separator} />
          <Text style={styles.answerText}>{answer}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#DBDCDB',
    padding: 16,
    marginBottom: 10,
  },
  expandedContainer: {
    paddingBottom: 26,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    color: '#15161E',
    fontSize: 14,
     
    fontFamily: 'Inter Tight',
  },
  icon: {
    width: 21,
    aspectRatio: 1.05,
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDCDB',
    marginVertical: 7,
  },
  answerText: {
    color: '#46515A',
    fontSize: 12,
     
    fontFamily: 'Inter Tight',
    marginTop: 10,
  },
});

export default FAQItem;