import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, Platform, KeyboardAvoidingView} from 'react-native';
import {GiftedChat, Bubble, MessageText, Time} from 'react-native-gifted-chat'

export default function Chat(props) {
    const [messages, setMessages] = useState([]); //state to hold messages

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
                sent: true,
                received: true,
                pending: true,
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(prevMessages => GiftedChat.append(prevMessages, messages));
    }, [])


    {/* Receive props name and color from the Start Screen*/}
    const {color} = props.route.params;
    const {name} = props.route.params;

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                // Change background color of bubbles
                wrapperStyle={{
                    left: {
                        backgroundColor: '#E0CDEE',
                    },
                    right: {
                        backgroundColor: '#D8ECEE',
                    }
                }}
                // Change font color of text in bubbles
                renderMessageText={(props) => {
                    return (
                        <MessageText
                            {...props}
                            textStyle={{
                                left: {
                                    color: '#000',
                                    paddingTop: 5,
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    fontSize: 15,
                                    fontWeight: '400',
                                },
                                right: {
                                    color: '#000',
                                    paddingTop: 5,
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    fontSize: 15,
                                    fontWeight: '400',
                                },
                            }}
                        />
                    );
                }}
                // Change font color of date displayed in bubbles
                renderTime = {(props) => {
                    return (
                        <Time
                            {...props}
                            timeTextStyle={{
                                left: {
                                    color: '#707070',
                                    padding: 5,
                                    fontSize: 10,
                                    textAlign: 'right',
                                },
                                right: {
                                    color: '#707070',
                                    padding: 5,
                                    fontSize: 10,
                                    textAlign: 'right',
                                },
                            }}
                        />
                    );
                }}
            />
        );
    }

    return (
        <View style={[{backgroundColor: color}, styles.container]}>
            <Text style={styles.welcomeText}>Hi there {name}, let's chat!</Text>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                }}
                renderBubble={renderBubble}
            />
            {/*Ternary solves issue on older Android phones, that message field hides, when user types on keyboard */}
            {
                Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcomeText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
    }
})
