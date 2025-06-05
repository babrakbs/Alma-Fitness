import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FaqData } from '../../../constants/staticData';
import ArrowIcon from '../../../assets/icons/ArrowIcon';
import { ArrowDownBlackIcon } from '../../../constants/svgs';
import { colors, fontFamily } from '../../../constants';
import Header from '../../../components/header';
import Button from '../../../components/Button';

const CustomerSupport = ({navigation}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
                            <Header label={'Support           '} showArrow={true} />

      <Text style={styles.header}>Frequently Asked Questions</Text>
      <FlatList
        data={FaqData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <ArrowDownBlackIcon/>
            </TouchableOpacity>
            {expandedIndex === index && item.answer !== '' && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        )}
      />
      <Text style={styles.footer}>For more detailed information, visit our <Text style={styles.link}>Help Centre</Text>.</Text>
      <Button handleClick={()=> navigation.navigate('Support')} text='Contact Us'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    color:colors.black,
    fontFamily:fontFamily.semiBold,
    fontWeight: '500',
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  questionContainer: {
    padding: 15,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: '#f8f8f8',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily:fontFamily.semiBold,
    color:colors.black,
    flex:1,
  },
  answer: {
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 14,
    color: colors.darkWhite,
  },
  footer: {
    marginTop: 20,
    marginBottom:10,
    alignSelf:'center',
    fontWeight: '500',
    fontSize: 14,
    color: colors.darkWhite,
    fontFamily:fontFamily.regular
  },
  link: {
    fontWeight: 'bold',
    fontFamily:fontFamily.bold,
    color: colors.black,
    textDecorationLine:'underline'
  },
});

export default CustomerSupport;
