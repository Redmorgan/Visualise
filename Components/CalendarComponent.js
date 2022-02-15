
 import React from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import WeekDayComponent from "./WeekDayComponent";
import CalendarGridComponent from "./CalendarGridComponent";

// Icons
import { FontAwesome } from '@expo/vector-icons'

const CalendarComponent = ({ navigation }) => {

    function openSettings(){

        Vibration.vibrate(5)
        navigation.push("Settings")

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <CalendarBackground source={MainBackgroundImage}>

            <SettingsTouchable onPress={()=>{openSettings()}} underlayColor={'#00000033'} activeOpacity={1}>

                <FontAwesome name="cog" size={40} color={"#8A84FF"} />

            </SettingsTouchable>

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

const SettingsTouchable = styled.TouchableHighlight`

    width:40px
    height:40px
    position:absolute
    right:25px
    top:30px
    display:flex
    justify-content:center
    align-items:center
    border-radius:10px

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
 