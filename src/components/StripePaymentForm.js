import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {
  CardField,
  useStripe,
  initStripe,
  CardForm,
  useConfirmPayment,
} from '@stripe/stripe-react-native';

// Option 1: Using CardField with custom styling
const StyledCardField = () => {
  const { confirmPayment } = useConfirmPayment();
  const [cardDetails, setCardDetails] = useState(null);

  const handleCardChange = (cardDetails) => {
    setCardDetails(cardDetails);
  };

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Please complete card details');
      return;
    }
    
    // Process payment logic here
    Alert.alert('Payment', 'Processing payment with CardField...');
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Option 1: Styled CardField</Text>
      <Text style={styles.description}>
        Single component with visually separated fields
      </Text>
      
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
          expiration: 'MM/YY',
          cvc: 'CVC',
          postalCode: 'ZIP',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          fontSize: 16,
        }}
        style={styles.cardField}
        onCardChange={handleCardChange}
      />
      
      <TouchableOpacity
        style={[styles.button, !cardDetails?.complete && styles.buttonDisabled]}
        onPress={handlePayment}
        disabled={!cardDetails?.complete}
      >
        <Text style={styles.buttonText}>Pay with CardField</Text>
      </TouchableOpacity>
    </View>
  );
};

// Option 2: Using CardForm for more separated fields
const SeparatedCardForm = () => {
  const { confirmPayment } = useConfirmPayment();
  const [complete, setComplete] = useState(false);

  const handleFormComplete = (complete) => {
    setComplete(complete);
  };

  const handlePayment = async () => {
    if (!complete) {
      Alert.alert('Please complete all fields');
      return;
    }
    
    // Process payment logic here
    Alert.alert('Payment', 'Processing payment with CardForm...');
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Option 2: CardForm</Text>
      <Text style={styles.description}>
        Fully separated fields with labels
      </Text>
      
      <CardForm
        postalCodeEnabled={true}
        cardStyle={styles.cardFormStyle}
        style={styles.cardForm}
        onFormComplete={handleFormComplete}
      />
      
      <TouchableOpacity
        style={[styles.button, !complete && styles.buttonDisabled]}
        onPress={handlePayment}
        disabled={!complete}
      >
        <Text style={styles.buttonText}>Pay with CardForm</Text>
      </TouchableOpacity>
    </View>
  );
};

// Option 3: Custom Implementation with Stripe Elements API
const CustomImplementation = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Option 3: Custom Implementation</Text>
      <Text style={styles.description}>
        For maximum customization, consider using individual TextInputs with the Stripe API directly. 
        This requires more custom code but gives complete control over positioning.
      </Text>
      
      <Text style={styles.codeNote}>
        Implementing this approach requires setting up a custom payment flow:
      </Text>
      
      <Text style={styles.codeBlock}>
        1. Collect card details with your own UI{'\n'}
        2. Use createToken() from Stripe SDK{'\n'}
        3. Send token to your server{'\n'}
        4. Complete payment on server side
      </Text>
      
      <Text style={styles.warning}>
        Note: Custom implementations require PCI compliance considerations
      </Text>
    </View>
  );
};

const App = () => {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    async function initialize() {
      try {
        await initStripe({
          publishableKey: 'pk_test_your_publishable_key',
          merchantIdentifier: 'merchant.com.yourapp',
        });
        setReady(true);
      } catch (error) {
        console.error('Failed to initialize Stripe', error);
      }
    }
    
    initialize();
  }, []);
  
  if (!ready) {
    return (
      <View style={styles.loading}>
        <Text>Loading Stripe...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Stripe Card Field Options</Text>
      
      <StyledCardField />
      <SeparatedCardForm />
      <CustomImplementation />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Choose the option that best fits your UI requirements
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 16,
  },
  cardForm: {
    width: '100%',
    height: 200,
    marginVertical: 16,
  },
  cardFormStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeNote: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  codeBlock: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'monospace',
    fontSize: 12,
    marginVertical: 8,
    color: '#333',
  },
  warning: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 8,
  },
  footer: {
    marginTop: 10,
    marginBottom: 40,
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});

export default App;