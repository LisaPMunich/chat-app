/*
On the start screen, add a text input field and a button as per the screen design provided in your project brief. The text input is for the user to enter their name, and the button is for them to enter the chat room (and be navigated to the chat screen).
You can use Flexbox for your app’s layout.
Apply the appropriate stylings to your start screen as per the handoff document. Links to the relevant React Native props can be found in the Resources section at the end of this Exercise.
You can use the default font rather than implementing a custom font.
 */

import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import checkBox from "react-native-web/dist/exports/CheckBox";
import image from "../assets/background-image.png";

export default function Start(){
    const [text, setText] = useState('');

    return(
        <View style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode='cover'
                style={styles.image}
            >
                <Text style={styles.title}>Chatty Betty</Text>
                <View style={styles.login} >
                    <View>
                        <TextInput
                            styles={styles.input}
                            onChangeText={(text)=>setText(text)}
                            value={text}
                            placeholder='Your Name'
                            />
                    </View>
                    <Text style={styles.choice}>
                        Choose Background Color:

                    </Text>
                    <TextInput type={checkBox}>

                    </TextInput>
                    <Button
                        styles={styles.button}
                        title='Start Chatting'
                        onPress={() => navigation.navigate('Chat',{name:name})}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    login:{
        backgroundColor: '#FFF',
        flex: 0.50,
        marginBottom: 30,
        marginRight: 30,
        marginLeft: 30,
        borderRadius: 5,
    },
    title:{
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        flex: 0.50,
        textAlign: 'center',
        marginTop: 110,
    },
    input:{
        fontSize: 16,
        fontWeight: 300,
        color: 'rgba(117, 112, 131, 0.5)',
        borderColor: 'rgba(117, 112, 131, 0.5)',
        borderWidth: 1,
        padding: 10,
        margin: 12,
        height: 40,
    },
    choice:{
      fontSize: 16,
      fontWeight: '300',
      color: 'rgba(117, 112, 131, 1)',
    },
    button:{
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        backgroundColor: '#757083'
    }

})