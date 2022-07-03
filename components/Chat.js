import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, Platform, KeyboardAvoidingView} from 'react-native';
import {GiftedChat, Bubble, MessageText, Time} from 'react-native-gifted-chat';
//Firestore Database
import { collection, onSnapshot, query, orderBy, addDoc } from "firebase/firestore";

import { auth, db } from '../config/firebase';

export default function Chat(props) {
    const [messages, setMessages] = useState([]); //state to hold messages

    {/* Receive props name and color from the Start Screen*/}
    const {color} = props.route.params;
    const {name} = props.route.params;


    // create reference to collection on firestore to store and retrieves chat messages of users
    useEffect(() =>{
        const messagesCollectionRef = collection(db, 'messages');
        const q = query(messagesCollectionRef, orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });
        return () => unsubscribe();
    },[]);

    useEffect((props) => {
        setMessages([
            {
                text: `${name} entered the chat`,
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(prevMessages =>
            GiftedChat.append(prevMessages, messages)
        );
        const {_id, createdAt, text, user} = messages [0];
        addDoc(collection(db, 'messages'),{
            _id,
            createdAt,
            text,
            user
        });
    }, [])


    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                // Change background color of bubbles
                wrapperStyle={{
                    left: {
                        backgroundColor: '#FFF',
                        padding: 8,
                    },
                    right: {
                        backgroundColor: '#BDE2EF',
                        padding: 8,
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
                                    fontSize: 15,
                                    fontWeight: '400',
                                },
                                right: {
                                    color: '#000',
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
                                    fontSize: 10,
                                    textAlign: 'right',
                                },
                                right: {
                                    color: '#707070',
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
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: name,
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
