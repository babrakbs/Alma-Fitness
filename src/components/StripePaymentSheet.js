import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';
import Button from './Button'; // Adjust path as needed

const StripePaymentSheet = ({
  publishableKey,
  clientSecret,
  onSuccess,
  onCancel,
  loading,
  setLoading,
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    if (clientSecret && publishableKey) {
      initializePaymentSheet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSecret, publishableKey]);

  const initializePaymentSheet = async () => {
    setLoading(true);
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Your Business Name',
      // customerId, customerEphemeralKeySecret, etc. if needed
    });
    setLoading(false);
    if (error) {
      alert(`Error initializing payment sheet: ${error.message}`);
      onCancel && onCancel();
    }
  };

  const openPaymentSheet = async () => {
    setLoading(true);
    const { error } = await presentPaymentSheet();
    setLoading(false);
    if (error) {
      alert(`Payment failed: ${error.message}`);
      onCancel && onCancel();
    } else {
      onSuccess && onSuccess();
    }
  };

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Button
              text="Pay"
              handleClick={openPaymentSheet}
              style={{ marginTop: 10 }}
            />
            <Button
              text="Cancel"
              handleClick={onCancel}
              style={{ marginTop: 10, backgroundColor: '#ccc' }}
            />
          </>
        )}
      </View>
    </StripeProvider>
  );
};

export default StripePaymentSheet;