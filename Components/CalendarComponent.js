
 import React from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Icons
import { AntDesign } from '@expo/vector-icons';

const CalendarComponent = ({ navigation }) => {

    
    function backToLogin(){

        Vibration.vibrate(5)
        navigation.pop()
    
    }


    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <CalendarBackground source={MainBackgroundImage}>
{/* 
            <BackArrowTouchable onPress={()=>{backToLogin()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color="#8A84FF" />

            </BackArrowTouchable> */}

        </CalendarBackground>

    </MainView>
 
    );
}
 
const MainView = styled.View`
 
    flex:1;
    display: flex;
    align-items: center;
    justify-content:center;
 
`
 
const CalendarBackground = styled.ImageBackground`
 
    width:100%;
    height:100%;
    display: flex;
 
`

const BackArrowTouchable = styled.TouchableHighlight`

    width:40px
    height:40px
    margin-left:30px
    margin-top: 30px
    border-radius:90px
    align-items:center
    justify-content:center

`

export default CalendarComponent;
 