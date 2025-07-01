import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { CameraIcon } from '../constants/svgs';
import { launchImageLibrary } from 'react-native-image-picker';

const UploadPhoto = ({ photo, setPhoto }) => {
    const handleImagePick = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.8,
                includeBase64: false,
            },
            response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    const asset = response.assets[0];
                    const source = {
                        uri: asset.uri,
                        name: asset.fileName || `photo_${Date.now()}.jpg`,
                        type: asset.type || 'image/jpeg',
                    };
                    setPhoto(source);
                }
            },
        );
    };

    return (
        <View style={styles.upperContainer}>
            <View style={styles.container}>
                <Pressable style={styles.cameraContainer} onPress={handleImagePick}>
                    <CameraIcon />
                </Pressable>
                {photo && (
                   photo?.uri? <Image
                        source={{ uri: photo.uri }}
                        style={styles.imagePreview}
                        resizeMode="cover"
                    />:
                    <Image
                        source={{ uri: photo }}
                        style={styles.imagePreview}
                        resizeMode="cover"
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 140,
        height: 140,
        backgroundColor: '#DBDCDB',
        borderRadius: 100,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // overflow: 'hidden',
        // position: 'relative'
    },
    upperContainer: {
        flex: 0.22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraContainer: {
        height: 30,
        width: 30,
        backgroundColor: '#15161E',
        borderRadius: 100,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        right: 5,
        zIndex: 2
    },
    imagePreview: {
        width: 120,
        height: 120,
        borderRadius: 100,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    }
});

export default UploadPhoto;
