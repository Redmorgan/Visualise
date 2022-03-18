
import React, { useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
 
// Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import WeekDayComponent from "./WeekDayComponent";
import CalendarGridComponent from "./CalendarGridComponent";

// Icons
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

const CalendarComponent = ({ navigation }) => {

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const[year, setYear] = useState(new Date().getFullYear())
    const[month, setMonth] = useState(new Date().getMonth()+1)
    const[isRefreshing, setRefreshing] = useState(false)

    var daysInMonth = getDaysInMonth(month)
    var firstDay = getFirstDay(month)
    var dates = setUpCalendar()

    function openSettings(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }
        navigation.push("Settings")

    }

    function setUpCalendar(){

        var firstDate = new Date(year, month-1, 1)

        var nextDate = new Date(year, month-1, 1)

        var dates = []

        if(firstDay == 0){

            firstDay = 7

        }

        for(let i = 1; i < firstDay; i++){

            dates.push({date:"X"})

        }
        
        for(let i = 1; i<= daysInMonth; i++){

            dates.push({date:new Date(nextDate)})

            nextDate = firstDate.setTime(firstDate.getTime() + 1 * 24 * 3600 * 1000); 

        }

        for(let i = 1; i<= (42-daysInMonth); i++){

            dates.push({date:"X"})

        }

        return dates
        
    }

    function getFirstDay(setMonth){

        return new Date(year, setMonth-1, 1).getDay()

    }

    function getDaysInMonth(setMonth){

        return new Date(year, setMonth, 0).getDate()

    }

    function nextMonth(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        var nextMonth

        if(month != 12){

            nextMonth = month + 1

            setMonth(nextMonth)

            setRefreshing(!isRefreshing)


        }else{

            var nextYear = year + 1

            setYear(nextYear)

            nextMonth = 1

            setMonth(nextMonth)

            setRefreshing(!isRefreshing)

        }

    }

    function previousMonth(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        var previousMonth

        if(month != 1){

            previousMonth = month -1

            setMonth(previousMonth)

            setRefreshing(!isRefreshing)


        }else{

            var previousYear = year - 1

            setYear(previousYear)

            previousMonth = 12

            setMonth(previousMonth)

            setRefreshing(!isRefreshing)

        }

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

                        <PreviousMonthTouchable onPress={()=>{previousMonth()}} underlayColor={'#00000033'} activeOpacity={1}>

                            <AntDesign name="left" size={40} color="black" style/>

                        </PreviousMonthTouchable>

                        <HeaderLabel>{months[month-1]} {year}</HeaderLabel>

                        <NextMonthTouchable onPress={()=>{nextMonth()}} underlayColor={'#00000033'} activeOpacity={1}>

                            <AntDesign name="right" size={40} color="black" />

                        </NextMonthTouchable>

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

                    <CalendarGridComponent dates={dates} navigation={navigation}/>

                    <CalendarNotesContainer>

                        {(global.View == "Adult")?
                        <NotesInput
                        placeholder={"Write notes here..."}
                        multiline={true}
                        numberOfLines={4}
                        style={{textAlignVertical:'top'}}/>
                        :
                        <NotesText/>}

                    </CalendarNotesContainer>

                </CalendarBody>

            </CalendarContainer>

        </CalendarBackground>

    </MainView>
 
    );
}
 
const MainView = styled.View`
 
    flex:1
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
    right:6%
    top:6%
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

    width:88%
    height:80.88%
    background-color:#ffffff
    border-radius:10px
    elevation:5

`

const CalendarHeader = styled.View`

    width:100%
    height:10%
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
    width:70%
    text-align:center

`

const PreviousMonthTouchable = styled.TouchableHighlight`

    width:45px
    height:50px
    display: flex;
    align-items: center;
    justify-content:center;
    border-radius:20px

`

const NextMonthTouchable = styled.TouchableHighlight`

    width:45px
    height:50px
    display: flex;
    align-items: center;
    justify-content:center;
    border-radius:20px

`

const WeekDayHeader = styled.View`

    width:100%
    height:5%
    border-bottom-width:1px
    border-bottom-color:#000000
    display:flex
    flex-direction:row

`

const CalendarNotesContainer = styled.View`

    width:100%
    height:36.6%
    border-bottom-left-radius:10px
    border-bottom-right-radius:10px

`

const NotesInput = styled.TextInput`

    width:100%
    height:100%
    font-family:Barlow
    font-size:24px
    padding:10px

`

const NotesText = styled.Text`

    width:100%
    height:100%
    font-family:Barlow
    font-size:24px
    padding:10px

`

export default CalendarComponent;
 