import React, {useCallback, useMemo, useRef, useState} from 'react';
import {ScrollView, Text, View, Pressable, StyleSheet} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Input from './input';
import FilterPill from './Home/FilterPill';
import TextLink from './Home/TextLink';
import Button from './Button';
import PreferenceListItem from './preferenceListItem';
import SearchIcon from '../assets/icons/SearchIcon';
import Header from './header';
import {
  PreeferenceListItemsData,
  preferenceListShort,
} from '../constants/staticData';

const ModalComponent = React.forwardRef((props, ref) => {
  // States to toggle between "Filter" and "All Results" views
  const [isFilter, setIsFilter] = useState(true);

  const snapPoints = useMemo(() => ['70%', '90%'], []);
  const allResultsSnapPoints = useMemo(() => ['95%', '95%'], []);

  const handleSwitchView = useCallback(() => {
    setIsFilter(prevState => !prevState);
  }, []);

  return (
    <BottomSheetModal
      enableDismissOnClose
      backgroundStyle={{backgroundColor: '#F5F5F5'}}
      backdropComponent={props => (
        <BottomSheetBackdrop {...props} opacity={0.2} enableTouchThrough />
      )}
      ref={ref}
      index={1}
      snapPoints={isFilter ? snapPoints : allResultsSnapPoints}
      onChange={props.onChange}>
      <BottomSheetView>
        {isFilter ? (
          // "Filter" view content
          <ScrollView>
            <Text style={styles.filterText}>Filter</Text>
            <View style={{width: '93%', margin: 'auto', marginTop: 17}}>
              <Input
                placeholder="Search Location"
                showLeftIcon
                leftSVGIcon={<SearchIcon />}
              />
            </View>
            <View style={{width: '93%', margin: 'auto', marginTop: 15}}>
              <Text style={styles.creditsText}>Credits</Text>
              <View style={{marginTop: 11, marginBottom: -10}}>
                <FilterPill />
              </View>
              {/* <TextLink firstText="Type of Workout" navTo="/" smallText /> */}
              <View style={{width: '87%', margin: 'auto'}}>
                {preferenceListShort?.map((item, index) => (
                  <PreferenceListItem
                    theme="black"
                    key={index}
                    title={item.title}
                    checked={item.checked}
                    handleClick={() => {
                      console.log(item);
                    }}
                  />
                ))}
              </View>
              <Text
                style={{
                  color: '#15161E',
                  // fontWeight: '600',
                  fontSize: 16,
                  marginTop: 20,
                }}>
                Time
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <View style={{width: '20%'}}>{/* Time Icon */}</View>
                <View
                  style={{width: '80%', display: 'flex', flexDirection: 'row'}}>
                  <View id="time"></View>
                  <View
                    id="slider"
                    style={{
                      width: '100%',
                      height: 22,
                      borderRadius: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#3D424A1A',
                      paddingLeft: 20,
                    }}>
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        backgroundColor: '#F5F5F5',
                        borderRadius: 20,
                      }}></View>
                    <View
                      style={{
                        backgroundColor: '#15161E',
                        width: '65%',
                        height: 22,
                      }}></View>
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        backgroundColor: '#F5F5F5',
                        borderRadius: 20,
                      }}></View>
                  </View>
                </View>
              </View>
              <View style={{marginVertical: 30}}>
                <Button
                  text="Show 34 results"
                  rounded={10}
                  handleClick={handleSwitchView}
                />
              </View>
            </View>
          </ScrollView>
        ) : (
          // "All Results" view content
          <ScrollView>
            {/* <NavigationContainer> */}
            <View style={{width: '95%', margin: 'auto'}}>
              {/* <Header
                  showArrow
                  label={'Type of Workout'}
                  navigation={navigation}
                  backButtonPress={handleSwitchView} // Close results and return to filter view
                /> */}
            </View>
            {/* </NavigationContainer> */}
            <View style={{width: '95%', margin: 'auto', marginTop: 17}}>
              <Input
                placeholder="Search Location"
                showLeftIcon
                leftSVGIcon={<SearchIcon />}
              />
            </View>
            <View style={{width: '93%', margin: 'auto', marginTop: 15}}>
              <View style={{width: '87%', margin: 'auto'}}>
                {PreeferenceListItemsData?.map((item, index) => (
                  <PreferenceListItem
                    theme="black"
                    key={index}
                    title={item.title}
                    checked={item.checked}
                    handleClick={() => {
                      console.log(item);
                    }}
                  />
                ))}
              </View>
              <View style={{marginVertical: 48}}>
                <Button
                  text="Apply"
                  rounded={10}
                  handleClick={props.closeModal}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ModalComponent;

const styles = StyleSheet.create({
  filterText: {
    // fontWeight: '600',
    color: '#15161E',
    textAlign: 'center',
    marginTop: 5,
  },
  creditsText: {
    color: '#15161E',
    // fontWeight: '600',
    fontSize: 16,
    // fontFamily: 'Inter Tight',
  },
});
