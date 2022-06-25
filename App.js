import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          component={Start}
          options={{ title: 'My home' }}
          />
        <Stack.Screen
          name='Chat'
          component={Chat}
          // use options to change name of Screen Headers to Name of User (props from Start.js)
          options={({route}) =>({title: route.params.name})}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

