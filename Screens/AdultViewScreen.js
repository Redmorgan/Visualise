
import React from "react";
import { Vibration, Alert } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import CalendarComponent from "../Components/CalendarComponent.js";
import TodayComponent from "../Components/TodayComponent.js";
import TaskManagerComponent from "../Components/TaskManagerComponent.js";

const Tab = createBottomTabNavigator();

//Icons
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const AdultViewScreen = ({ navigation }) => {

    const onPressVibration = (input) => {

        Alert.alert(`Button Pressed: ${input}`);

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <MainBody>

            <Tab.Navigator screenOptions={{
                headerShown:false,
                tabBarActiveBackgroundColor:"#8A84FF",
                tabBarInactiveBackgroundColor:"#8A84FF",
                tabBarActiveTintColor:"#ffffff",
                tabBarInactiveTintColor:"#ffffffb3",
                tabBarLabelStyle:{fontSize:24},
                tabBarStyle:{
                    height:65}
                }}>

                <Tab.Screen
                    name="Calendar"
                    component={CalendarComponent}
                    options={{
                        tabBarIcon:({color}) =>(
                            <Entypo name="calendar" size={24} color={color}/>
                        ),
                        tabBarItemStyle:{borderRightColor:"#ffffff", borderRightWidth:1}
                    }}
                />

                <Tab.Screen
                    name="Today"
                    component={TodayComponent}
                    options={{
                        unmountOnBlur:true,
                        tabBarIcon:({color}) =>(
                            <AntDesign name="clockcircle" size={24} color={color} />
                        ),
                        tabBarItemStyle:{borderColor:"#ffffff", borderLeftWidth:1, borderRightWidth:1}
                    }}
                />

                <Tab.Screen
                    name="Tasks"
                    component={TaskManagerComponent}
                    options={{
                        tabBarIcon:({color}) =>(
                            <FontAwesome name="cog" size={24} color={color} />
                        ),
                        tabBarItemStyle:{borderLeftColor:"#ffffff", borderLeftWidth:1}
                    }}
                />

            </Tab.Navigator>

        </MainBody>

    </MainView>
 
    );
}
 
const MainView = styled.View`
 
    flex:1
    display: flex;
    align-items: center;
    justify-content:center;
 
`
 
const MainBody = styled.View`

    height:100%
    width:100%

`

export default AdultViewScreen;
 