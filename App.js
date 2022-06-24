import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Start'
          component={Start}
          />
        {/*<Stack.Screen*/}
        {/*  name='Chat'*/}
        {/*  component={Chat}*/}
        {/*  />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

