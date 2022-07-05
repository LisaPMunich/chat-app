
// Save messages in async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMessagesToStorage = async (messages) => {
    if(!messages || !messages.length){
        console.log('AsyncStorage | No Save necessary, empty message array.');
        return;
    }

    try {
        await AsyncStorage.setItem('messages', JSON.stringify(messages));
        console.log(`AsyncStorage | ${messages.length} messages cached`);
    } catch (error) {
        console.error(error.message)
    }
}

// get messages from async storage
export const loadMessageFromStorage = async () => {
    console.log('AsyncStorage | Load messages from Storage')
    try {
        const messageString = await AsyncStorage.getItem('messages') || [];
        const messageArray = JSON.parse(messageString) || [];

        console.log(`AsyncStorage | ${messageArray.length} messages restored`);

        return messageArray;
    } catch (error) {
        console.error(error.message);
    }
};

// delete messages from async storage
export const resetMessageStorage = async () => {
    try {
        await AsyncStorage.removeItem('messages');
        await AsyncStorage.setItem('messages', JSON.stringify([]));
        console.log('AsyncStorage | Reset successful')
    } catch (error) {
        console.error(error.message)
    }
}