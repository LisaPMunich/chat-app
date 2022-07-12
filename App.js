import {createContext, useContext, useEffect, useState} from "react";

import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './config/firebase';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {ActivityIndicator, View} from "react-native";


// create React Navigator
const Stack = createStackNavigator();

// create context for user data
const AuthenticatedUserContext = createContext({});

// create provider to allow the screen components to access the current user
const AuthenticatedUserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthenticatedUserContext.Provider value={{user, setUser}}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

// function handles users state-changes and unsubscribes when component unmounts
function RootNavigator() {
    const {user, setUser} = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth,
            async authenticatedUser => {
                authenticatedUser ? setUser(authenticatedUser) : setUser(null);
                setIsLoading(false);
            }
        );
        return unsubscribeAuth; // unsubscribes auth listener when component unmounts
    }, [user]);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                {/*{user ?*/}
                    <Stack.Screen
                        name='Chat'
                        component={Chat}
                        // use options to change name of Screen Headers to Name of User (props from Start.js)
                        options={({route}) => ({title: route.params.name})}
                    />
                    {/*:*/}
                    <Stack.Screen
                        name='Start'
                        component={Start}
                        options={{title: 'My home'}}
                    />
                {/*}*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default function App() {
    return (
        <AuthenticatedUserProvider>
            <RootNavigator />
        </AuthenticatedUserProvider>
    );
}

