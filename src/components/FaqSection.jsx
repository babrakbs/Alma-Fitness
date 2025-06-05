import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import FAQItem from './FaqItem';
import { FaqData } from '../constants/staticData';


const FAQSection = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

  // Function to handle the expansion of FAQ items
  const toggleExpand = (index) => {
    // Toggle the expanded index
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };
  return (
    <View style={styles.container}>
      {FaqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} expanded={expandedIndex === index}
          onPress={() => toggleExpand(index)} // Pass toggle function
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});

export default FAQSection;