
import React ,{ useEffect, useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';

// Screens
import CalendarComponent from "../Components/CalendarComponent.js";
import TodayComponent from "../Components/TodayComponent.js";

const Tab = createBottomTabNavigator();

//Icons
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const ChildViewScreen = ({ }) => {

    const [isReloading, setReloading] = useState(false)
    const isFocused = useIsFocused();

    useEffect(()=>{
        (async () => {

            setReloading(!isReloading)

        })()
    },[isFocused])

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <MainBody>

            <Tab.Navigator screenOptions={{
                headerShown:false,
                tabBarActiveBackgroundColor:global.theme,
                tabBarInactiveBackgroundColor:global.theme,
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
                        unmountOnBlur:true,
                        tabBarIcon:({color}) =>(
                            <Entypo name="calendar" size={24} color={color}/>
                        ),
                        tabBarItemStyle:{borderRightColor:"#ffffff", borderRightWidth:1}
                    }}
                    listeners={() => ({
                        tabPress: () => {
                            if(global.vibe != 0){

                                Vibration.vibrate(5)
                    
                            }
                        },
                    })}
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
                    listeners={() => ({
                        tabPress: () => {
                            if(global.vibe != 0){

                                Vibration.vibrate(5)
                    
                            }
                        },
                    })}
                />

            </Tab.Navigator>

        </MainBody>

    </MainView>

    );
}

const MainView = styled.View`

    flex:1;
    display: flex;
    align-items: center;
    justify-content:center;

`

const MainBody = styled.View`

    height:100%
    width:100%

`

export default ChildViewScreen;
