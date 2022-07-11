import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {storage} from "../config/firebase";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';


export default function CustomActions(props) {
    const {showActionSheetWithOptions} = useActionSheet();


    // upload images to firebase storage
    async function uploadImage(uri) {
        const img = await fetch(uri)
        const imgBlob = await img.blob();

        const imageNameBefore = uri.split('/');
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const storageRef = ref(storage, `images/${imageName}`);

        return uploadBytes(storageRef, imgBlob)
            .then(async snapshot => {
                imgBlob.close();
                return getDownloadURL(snapshot.ref).then(url => {

                    return url;
                });
            });
    }

    // pick image from the smartphone image library after permission is given
    async function pickImage() {
        // permission to select image from library?
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        try {
            if (status === 'granted') {
                // pick image, if permission granted
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images
                }).catch((error) => console.error(error));

                // if not cancelled, upload and send image
                if (!result.cancelled) {
                    const imageUrl = await uploadImage(result.uri);

                    props.onSend({image: imageUrl});
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // take photo with smartphone camera
    async function takePhoto() {
        // permission to use camera?
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        try {
            // launch camera, if permission granted
            if (status === 'granted') {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch(error => console.error(error));
                // if action is not cancelled, upload and send image
                if (!result.cancelled) {
                    const imageUrl = await uploadImage(result.uri);

                    props.onSend({image: imageUrl});
                    console.log('props.onSend triggered', imageUrl);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }


    // get location of user via GPS
    async function getLocation() {
        //permission to access current location?
        const {status} = await Location.requestForegroundPermissionsAsync();
        try {
            // if permission is granted, get location
            if (status === 'granted') {
                const result = await Location.getCurrentPositionAsync({})
                    .catch((error) => {
                        console.error(error);
                    });
                // if location is found/selected, send it
                if (result) {
                    props.onSend({
                        location: {
                            longitude: result.coords.longitude,
                            latitude: result.coords.latitude,
                        },
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }


    function onActionPress() {
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel'
        ];
        const cancelButtonIndex = options.length - 1;

        showActionSheetWithOptions({
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        return pickImage();
                    case 1:
                        console.log('user wants to take a photo');
                        return takePhoto();
                    case 2:
                        console.log('user wants to get theier location');
                        return getLocation();
                    default:
                }
            }
        )
    }


    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onActionPress}
            accessible={true}
            accessibilityLabel="options media usage"
            accessibilityHint="Choose an image to send, take a picture or share your location.">
            <View
                style={[styles.wrapper, props.wrapperStyle]}>
                <Text stlye={[styles.iconText, props.iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
})

CustomActions.contextTypes = {
    actionSheet: PropTypes.func
}