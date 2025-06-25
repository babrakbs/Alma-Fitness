import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import Header from '../../../components/header';
import PaymentOption from '../../../components/PaymentOption';
import { PaymentOptions } from '../../../constants/staticData';
import Button from '../../../components/Button';
import { CardIcon, DeleteIcon } from '../../../constants/svgs';
import { CardsData } from '../../../constants/staticData';

const SavedCards = ({navigation}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(PaymentOptions);
    const [addedCard, setAddedCard] = useState(true);
    const handleClick = (index) => {
        const updatedOptions = selectedPaymentMethod.map((option, i) => {
            if (i === index) {
                return { ...option, selected: true };
            } else {
                return { ...option, selected: false };
            }
        });
        setSelectedPaymentMethod(updatedOptions);
    };

    const handleNavigation = () => {
        navigation.navigate('OTPVerificationPayment');
    };

    const deletBtn = () => {
        setAddedCard(false);
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header showArrow label={'Select Payment Method'} />
                {selectedPaymentMethod.map((option, index) => (
                    <PaymentOption
                        key={index}
                        title={option.title}
                        description={option.description}
                        checked={option.selected}
                        handleClickFunction={() => handleClick(index)}
                    />
                ))}

                {
                    addedCard &&
                    <>
                    <Text style={styles.addedCardsText}>Added Cards</Text>
                <View style={styles.selectedCardMainContainer}>
                    <View style={styles.cardNameContainer}>
                        <Text style={styles.cardTypeText}>Debit Card</Text>
                        <View style={styles.radioButton}>
                        </View>
                    </View>
                    <View style={styles.deleteCardMainContainer}>
                        <View style={styles.cardIconAndDeleteIconContainer}>
                            <View style={styles.cardIconContainer}>
                                <CardIcon />
                                {
                                    CardsData?.map((item) => {
                                        return (
                                            <View style={styles.dots}></View>
                                        );
                                    })
                                }
                                <Text style={styles.visibleCardNumbers}>3549</Text>
                            </View>
                            <Pressable onPress={deletBtn}>
                            <DeleteIcon />
                            </Pressable>
                        </View>
                    </View>
                </View>
                </>
                }
                
            </SafeAreaView>
            <View style={styles.buttonCont}>
                <Button handleClick={handleNavigation} text='Continue' theme="blackWhite" />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 26,
        backgroundColor: "#F5F5F5",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "stretch",
        margin: "0 auto",
        padding: 16,
        height: '85%'
    },
    buttonCont: {
        marginTop: 30,
        width: '90%',
        marginHorizontal: '5%'
    },
    selectedCardMainContainer: {
        width: '100%',
        borderRadius: 100,
        // borderWidth: 1,
        backgroundColor: "#ffffff",
        marginTop: 10,
        elevation:5,
        paddingVertical: 15,
        paddingHorizontal:10
    },
    addedCardsText: {
        fontSize: 14,
        // fontWeight: '700',
        color: '#242424',
        marginTop: 15,
    },
    cardNameContainer: {
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    radioButton: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#C7CACD",
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteCardMainContainer: {
        width: '90%',
        marginHorizontal: '5%',
        justifyContent: 'space-between',
        marginTop: 10,
        flexDirection: 'row',
    },
    cardIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dots: {
        height: 7,
        width: 7,
        borderRadius: 100,
        backgroundColor: '#15161E',
        marginLeft: 5
    },
    visibleCardNumbers: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5
    },
    cardIconAndDeleteIconContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTypeText: {
        fontSize: 14,
        // fontWeight: '700',
        color: '#232323'
    }
});

export default SavedCards;
