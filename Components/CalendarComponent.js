
 import React from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import WeekDayComponent from "./WeekDayComponent";
import CalendarGridComponent from "./CalendarGridComponent";

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

            <CalendarContainer>

                <CalendarBody>

                    <CalendarHeader>

                        <HeaderLabel>January 2022</HeaderLabel>

                    </CalendarHeader>

                    <WeekDayHeader>

                        <WeekDayComponent day="Mon"/>

                        <WeekDayComponent day="Tues"/>

                        <WeekDayComponent day="Wed"/>

                        <WeekDayComponent day="Thur"/>

                        <WeekDayComponent day="Fri"/>

                        <WeekDayComponent day="Sat"/>

                        <WeekDayComponent day="Sun"/>

                    </WeekDayHeader>

                    <CalendarGridComponent month="January"/>

                </CalendarBody>

            </CalendarContainer>

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

const CalendarContainer = styled.View`

    width:100%
    height:100%
    align-items:center
    justify-content:center
    margin-top:30px

`

const CalendarBody = styled.View`

    width:350px
    height:672px
    background-color:#ffffff
    border-radius:10px
    elevation:5

`

const CalendarHeader = styled.View`

    width:100%
    height:60px
    border-bottom-width:1px
    border-bottom-color:#000000
    display:flex
    flex-direction:row
    justify-content:space-around
    align-items:center

`

const HeaderLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#000000

`

const WeekDayHeader = styled.View`

    width:100%
    height:30px
    border-bottom-width:1px
    border-bottom-color:#000000
    display:flex
    flex-direction:row

`

export default CalendarComponent;
 