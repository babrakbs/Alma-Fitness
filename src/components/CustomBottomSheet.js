import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const CustomBottomSheet = forwardRef(
  (
    {
      children,
      snapPoints = ['40%'],
      onChange,
      enablePanDownToClose = true,
      index = -1,
      hasPadding = true,
      hasThumb = true,
      onOpenChange,
    },
    ref,
  ) => {
    const sheetRef = useRef(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.expand(),
      close: () => sheetRef.current?.close(),
    }));

    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);
    const handleSheetChanges = useCallback(
      index => {
        if (onChange) onChange(index);
        if (onOpenChange) {
          onOpenChange(index !== -1);
        }
      },
      [onChange, onOpenChange],
    );

    return (
      <BottomSheet
        ref={sheetRef}
        index={index}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose={enablePanDownToClose}
        onChange={handleSheetChanges}
        style={styles.sheet}
        backgroundStyle={styles.background}
        handleComponent={null}>
        <BottomSheetView
          style={[styles.content, hasPadding && styles.paddedContent]}>
          {hasThumb && (
            <View style={styles.dragThumbContainer}>
              <View style={styles.dragThumb} />
            </View>
          )}
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  dragThumbContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },

  dragThumb: {
    width: 96,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DADADA', // light gray color
  },

  sheet: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  background: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  paddedContent: {
    padding: 16,
  },
});

export default CustomBottomSheet;
