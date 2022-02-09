import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

// Components
import LoginScreen from './Screens/LoginScreen.js'
import CreateAccountScreen from './Screens/CreateAccountScreen.js'
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen.js';
import LoginHelpScreen from './Screens/LoginHelpScreen.js';
import ChildViewScreen from './Screens/ChildViewScreen.js';
import ViewPickScreen from './Screens/ViewPickScreen.js';
import AdultViewScreen from './Screens/AdultViewScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {

  // Loads the custom fonts that are used all throughout the application.
  const fetchFonts = () => {
    return Font.loadAsync({
      Barlow: require('../Timetable/assets/Barlow-Regular.ttf'),
      BarlowBold: require('../Timetable/assets/Barlow-Bold.ttf'),
      BarlowSemi: require('../Timetable/assets/Barlow-SemiBold.ttf')
    });
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return (

      <AppLoading
        startAsync = {fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}/>

    );

  }

  return (

    <NavigationContainer>

    <AppLoading/>

      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown:false }}>

        <Stack.Screen name="Login"component={LoginScreen}/>
        <Stack.Screen name="CreateAccount"component={CreateAccountScreen}/>
        <Stack.Screen name="ForgotPassword"component={ForgotPasswordScreen}/>
        <Stack.Screen name="LoginHelp"component={LoginHelpScreen}/>
        <Stack.Screen name="ViewPick"component={ViewPickScreen}/>
        <Stack.Screen name="ChildView"component={ChildViewScreen}/>
        <Stack.Screen name="AdultView"component={AdultViewScreen}/>

      </Stack.Navigator>
      
    </NavigationContainer>

  );
}
