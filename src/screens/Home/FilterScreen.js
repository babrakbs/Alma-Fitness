/** @format */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Header from '../../components/header';
import {colors, fontFamily} from '../../constants';
import Button from '../../components/Button';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import axiosInstance from '../../helper/axiosInstance';
import {useSelector, useDispatch} from 'react-redux';
import {setFiltersOfclasses, clearFiltersOfclasses} from '../../Redux/reducer';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

// const categories = [
//   'All',
//   'Yoga',
//   'Pilates',
//   'Cardio',
//   'Dance',
//   'Martial Arts',
//   'Aerial',
//   'Functional Training',
//   'Strength Training',
//   'Meditation',
//   'Aqua',
//   'Wellness',
//   'Crossfit',
//   'Fitness',
//   'Other',
// ];

const FilterScreen = ({navigation}) => {
  const filtersOfclasses = useSelector(state => state.reducer.filtersOfclasses);

  const [selectedCategories, setSelectedCategories] = useState(
    filtersOfclasses && filtersOfclasses.categories
      ? filtersOfclasses.categories
      : [],
  );
  const [price, setPrice] = useState(
    filtersOfclasses && filtersOfclasses.price ? filtersOfclasses.price : 1,
  );
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categoriesList');
      setCategories(response?.data?.data?.records);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategory = categoryId => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId],
    );
  };

  const dispatch = useDispatch();
  const handleApply = () => {
    console.log('Selected Categories:', selectedCategories);
    console.log('Selected Price:', price);
    // Dispatch filters to Redux
    dispatch(
      setFiltersOfclasses({
        categories: selectedCategories,
        price: price,
      }),
    );
    navigation.goBack();
    // Optionally, you can navigate or close the filter screen here
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPrice(1);
    // Clear filters in Redux
    dispatch(clearFiltersOfclasses());
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* <Text style={styles.header}>Filters</Text> */}
        <Header label={'Filters       '} showArrow={true} />

        <Text style={styles.sectionTitle}>Category</Text>
        <View style={{height: heightPercentageToDP(32)}}>
          <FlatList
            data={[{id: 'all', name: 'All'}, ...categories]}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  (item.id === 'all'
                    ? selectedCategories.length === 0
                    : selectedCategories.includes(item.id)) &&
                    styles.selectedCategory,
                ]}
                onPress={() => {
                  if (item.id === 'all') {
                    setSelectedCategories([]);
                  } else {
                    toggleCategory(item.id);
                  }
                }}>
                <Text
                  style={[
                    styles.categoryText,
                    (item.id === 'all'
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(item.id)) &&
                      styles.selectedText,
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.divider} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.priceContainer}>
            {/* <TouchableOpacity
            style={styles.priceButton}
            onPress={() => setPrice(Math.max(1, price - 1))}>
            <Text style={styles.priceText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.priceValue}>€{price}</Text>
          <TouchableOpacity
            style={styles.priceButton}
            onPress={() => setPrice(price + 1)}>
            <Text style={styles.priceText}>+</Text>
          </TouchableOpacity> */}
            <ArrowIcon />
          </View>
        </View>

        <View style={styles.divider} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={styles.sectionTitle}>Price</Text>
          <View style={styles.priceContainer}>
            <TouchableOpacity
              style={styles.priceButton}
              onPress={() => setPrice(Math.max(1, price - 1))}>
              <Text style={styles.priceText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.priceValue}>€{price}</Text>
            <TouchableOpacity
              style={styles.priceButton}
              onPress={() => setPrice(price + 1)}>
              <Text style={styles.priceText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />

        {/* <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
       */}
        {/* <TouchableOpacity style={styles.resetButton} onPress={() => {
        setSelectedCategory(null);
        setPrice(1);
      }}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity> */}
      </SafeAreaView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button handleClick={handleApply} text="Apply" textBold={false} />
        <View style={{marginVertical: heightPercentageToDP(1)}}>
          <Button
            text="Reset"
            theme="whiteBlack"
            textBold={false}
            widthSize="large"
            borderLess={false}
            handleClick={handleReset}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: colors.white},
  header: {
    fontSize: 24,
     
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  sectionTitle: {
    fontSize: 18,
     
    marginVertical: 10,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  categoryButton: {
    // padding: 10,
    height: heightPercentageToDP(3.5),
    // width: widthPercentageToDP(30),
    paddingHorizontal: widthPercentageToDP(4),

    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.darkWhite,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '120%',
    alignSelf: 'center',
    marginTop: 5,
    height: 1,
    backgroundColor: '#dbdbdb',
    borderWidth: 0.1,
  },
  selectedCategory: {backgroundColor: colors.black},
  categoryText: {
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    // fontWeight: '600',
    fontSize: 14.3,
  },
  selectedText: {color: colors.white},
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap:widthPercentageToDP(2)
  },
  priceButton: {
    fontSize: 16,
    padding: 7,
    borderWidth: 0.2,
    borderRadius: 10,
    marginHorizontal: widthPercentageToDP(2),
    paddingHorizontal: 12,
    color: colors.lightGray,
  },
  priceText: {
    fontSize: 16,
    // fontWeight: '600',
    color: colors.black,
    fontFamily: fontFamily.semiBold,
  },
  priceValue: {
    fontSize: 16,
    // fontWeight: '600',
    color: colors.black,
    fontFamily: fontFamily.semiBold,
  },
  applyButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  applyText: {color: '#fff', fontSize: 16,
    //  fontWeight: '600'
    },
  resetButton: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  resetText: {color: '#000', fontSize: 16,
    //  fontWeight: 'bold'
    },
});

export default FilterScreen;
