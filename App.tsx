import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Form from './components/Form'; 
import { StatusBar } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Form: { recipe?: any }; 
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ title: 'Recipe Form' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
