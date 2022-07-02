/*
On the start screen, add a text input field and a button as per the screen design provided in your project brief. The text input is for the user to enter their name, and the button is for them to enter the chat room (and be navigated to the chat screen).
You can use Flexbox for your app’s layout.
Apply the appropriate stylings to your start screen as per the handoff document. Links to the relevant React Native props can be found in the Resources section at the end of this Exercise.
You can use the default font rather than implementing a custom font.
 */

import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, Pressable} from 'react-native';
import {TextInput} from "react-native-paper";
import image from "../assets/chattybetty_backgroundImage_blue.png";

export default function Start(props) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    // create color objects to set backgroundColor with press on colorButtons
    const colors = {
        orange: '#D38333',
        red: '#D47C76',
        blue: '#91acd9',
        cascara: '#F03E33',
        lionheart:'#CF1C1E'
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode='cover'
                style={styles.image}
            >
                <Text style={styles.title} accessibilityRole='header'>Chatty Betty</Text>
                <View style={styles.loginBox}>
                    {/*User can enter his name*/}
                    <TextInput
                        style={styles.input}
                        onChangeText={(name) => setName(name)}
                        value={name}
                        left={<TextInput.Icon name="account-outline"/>}
                        placeholder='Your Name'
                        accessible={true}
                        accessiblityHint='Type in your name into the input field to customize your chat screen'
                        accessibilityLabel='Please type in your name'
                    />
                    {/*User can choose background color for the chat screen*/}
                    <View style={styles.choiceTextWrapper}>
                        <Text style={styles.choiceText} accessibilityRole='text'>
                            Choose Background Color:
                        </Text>
                    </View>
                    <View
                        style={styles.colorButtonWrapper} accessibilityRole='radio group'>
                        <TouchableOpacity
                            style={styles.colorButton1}
                            onPress={(color) => setColor(colors.orange)}
                            accessible={true}
                            accessibilityRole='radio'
                            accessibilityLabel='Tap me to select color'
                            accessibilityHint='By tapping you choose the background color of chat screen'
                        />
                        <TouchableOpacity
                            style={styles.colorButton2}
                            onPress={(color) => setColor(colors.red)}
                            accessible={true}
                            accessibilityRole='radio'
                            accessibilityLabel='Tap me to select color'
                            accessibilityHint='By tapping you choose the background color of chat screen'
                        />
                        <TouchableOpacity
                            style={styles.colorButton3}
                            onPress={(color) => setColor(colors.blue)}
                            accessible={true}
                            accessibilityRole='radio'
                            accessibilityLabel='Tap me to select color'
                            accessibilityHint='By tapping you choose the background color of chat screen'
                        />
                        <TouchableOpacity
                            style={styles.colorButton4}
                            onPress={(color) => setColor(colors.cascara)}
                            accessible={true}
                            accessibilityRole='radio'
                            accessibilityLabel='Tap me to select color'
                            accessibilityHint='By tapping you choose the background color of chat screen'
                        />
                        <TouchableOpacity
                            style={styles.colorButton5}
                            onPress={(color) => setColor(colors.lionheart)}
                            accessible={true}
                            accessibilityRole='radio'
                            accessibilityLabel='Tap me to select color'
                            accessibilityHint='By tapping you choose the background color of chat screen'
                        />
                    </View>
                    {/*Pressing button navigates to Chat Screen, transferring props name and set backgroundColor*/}
                    <Pressable
                        style={styles.button}
                        onPress={() => props.navigation.navigate('Chat', {name: name, color: color})}
                        accessible={true}
                        accessibilityRole='button'
                        accessibilityLabel='Press me to navigate to chat screen'
                        accessibilityHint='By pressing the button you are redirected to the chat screen'
                    >
                        <Text style={styles.buttonText} accessibilityRole='text'>
                            Start Chatting
                        </Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        height: '56%',
        width: '88%',
        fontSize: 45,
        fontWeight: '600',
        color: '#CF1C1E',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    loginBox: {
        backgroundColor: '#FFF',
        height: '44%',
        width: '88%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '2%',
        marginBottom: '6%',
    },
    input: {
        height: 60,
        width: '88%',
        fontSize: 16,
        fontWeight: '300',
        color: 'rgba(117, 112, 131, 0.5)',
        backgroundColor: '#ffffff',
        borderColor: 'rgba(117, 112, 131, 0.5)',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderStyle: "solid",
    },
    choiceTextWrapper:{
        width: '88%',
    },
    choiceText: {
        fontSize: 16,
        fontWeight: '300',
        color: 'rgba(117, 112, 131, 1)',
        marginRight: 'auto',
    },
    colorButtonWrapper:{
        flexDirection: 'row',
        margin: 12,
        alignSelf: 'flex-start',
    },
    colorButton1: {
        backgroundColor: '#D38333',
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginLeft: '5%',
    },
    colorButton2: {
        backgroundColor: '#D47C76',
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginLeft: '5%',
    },
    colorButton3: {
        backgroundColor: '#91acd9',
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginLeft: '5%',
    },
    colorButton4: {
        backgroundColor: '#F03E33',
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginLeft: '5%',

    },
    colorButton5: {
        backgroundColor: '#CE1C1E',
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginLeft: '5%',
    },
    button: {
        width: '88%',
        height: 60,
        backgroundColor: '#50D2D3',
        borderColor: '#50D2D3',
        borderWidth: 1,
        borderStyle: "solid",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    }

})