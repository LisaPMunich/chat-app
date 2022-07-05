import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, Platform, KeyboardAvoidingView} from 'react-native';
import {GiftedChat, SystemMessage, Bubble, MessageText, Time, InputToolbar} from 'react-native-gifted-chat';
import {collection, onSnapshot, query, orderBy, addDoc} from "firebase/firestore";
import {auth, db} from '../config/firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import NetInfo from "@react-native-community/netinfo";
import {loadMessageFromStorage, resetMessageStorage, saveMessagesToStorage} from "../async-storage";

export default function Chat(props) {
    const [messages, setMessages] = useState([]); //state to hold messages
    const [isOnline, setIsOnline] = useState(false); //state to hold information about online status
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); //state to display welcome message only until user starts chatting

    // Receive props name and color from the Start Screen
    const {color} = props.route.params;
    const {name} = props.route.params;

    const messagesCollectionRef = collection(db, 'messages');

    // WHEN USER OFFLINE, LOAD/DISPLAY MESSAGES FROM ASYNCSTORAGE
    useEffect(() => {
        // Get the network state once, at the first initialization
        NetInfo.fetch().then(netInfoStatus => {
            console.log('NetInfo Init -- ',netInfoStatus.isConnected);
            if (netInfoStatus.isConnected) {
                setIsOnline(true);
            } else {
                setIsOnline(false);
            }
        });

        // Subscribe to network changes
        const unsubscribe = NetInfo.addEventListener(netInfoStatus => {
            console.log('NetInfo -- ',netInfoStatus.isConnected);
            if (netInfoStatus.isConnected) {
                setIsOnline(true);
            } else {
                setIsOnline(false);
            }
        });

        // Cleanup on onmount
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        // Variable to subscribe to network state updates
        let unsubscribe;

        // IF USER IS ONLINE, get messages from firestore, if user offline get messages from cache using async storage
        if (isOnline) {
            const messagesCollectionRef = collection(db, 'messages');
            const q = query(messagesCollectionRef, orderBy('createdAt', 'desc'))

            unsubscribe = onSnapshot(q, querySnapshot => {
                console.log('Load Collection from Firebase.', querySnapshot.docs.length);
                setMessages(
                    querySnapshot.docs.map(doc => ({
                        _id: doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user
                    }))
                );
            });

            // unsubscribe snapshot listener
            return () => unsubscribe();
        } else {
            loadMessageFromStorage()
                .then(messageArray => setMessages(messageArray)); // IF USER IS OFFLINE GET MESSAGES FROM ASYNC STORAGE
        }

    }, [isOnline]);

    useEffect(() => {
        saveMessagesToStorage(messages);
    }, [messages]);

    // delete saved messages in asyncStorage
    // resetMessageStorage();

    useEffect((props) => {
        setMessages({
            _id: uuidv4(),
            text: `${name} entered the chat.`,
            createdAt: new Date(),
            system: true,
        });
    }, []);


    // add last message sent to the Firestore collection "messages"
    const addMessage = (message) => {
        const {text} = message;

        if(!text){
            return;
        }

        console.log(message);
        try {
            addDoc(messagesCollectionRef, message)
        } catch (e){
            console.error('Invalid message object', message);
            console.error(e);
        }
    }

    const onSend = useCallback((messages = []) => {
        setShowWelcomeMessage(false);
        setMessages(prevMessages =>
            GiftedChat.append(prevMessages, messages)
        );

        addMessage(messages[0]);
    }, [])


    // custom styles for speech bubbles
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
                renderTime={(props) => {
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

    // Hide input toolbar if user is offline
    function renderInputToolbar(props) {
        if(!isOnline){
            return null;
        }
        return (
            <InputToolbar
                {...props}
            />
        )
    }

    return (
        <View style={[{backgroundColor: color}, styles.container]}>
            {showWelcomeMessage && <Text style={styles.welcomeText}>Hi there {name}, let's chat!</Text>}
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: name,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any',
                }}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
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
