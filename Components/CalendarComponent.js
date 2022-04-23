/**
 * @fileoverview The component used for the calendar tab that displays the interactive calendar and notes section
*/

import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firestore from '../firebaseConfig.js'
import {useIsFocused} from '@react-navigation/native';

// Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import WeekDayComponent from "./WeekDayComponent";
import CalendarGridComponent from "./CalendarGridComponent";

// Icons
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 * 
 * @returns A component containing a calendar and a notes section.
 */
const CalendarComponent = ({ navigation }) => {

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const[year, setYear] = useState(new Date().getFullYear())
    const[month, setMonth] = useState(new Date().getMonth()+1)
    const[isRefreshing, setRefreshing] = useState(false)
    const[notes, setNotes] = useState("")
    const[isLoaded, setLoading] = useState(false)
    const isFocused = useIsFocused();

    var daysInMonth = getDaysInMonth(month)
    var firstDay = getFirstDay(month)
    var dates = setUpCalendar()

    useEffect(()=>{
        (async () => {

            daysInMonth = getDaysInMonth(month)
            firstDay = getFirstDay(month)
            dates = setUpCalendar()

        })()
    },[isFocused])

    /**
     * @summary Opens the settings page.
     * 
     * @description Runs when the settings cog is pressed and opens up the settings page in a new stack.
     */
    function openSettings(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.push("Settings")

    }

    /**
     * @summary Collects and returns a list of all the days in a month.
     * 
     * @description Collects a list of all the dates in a given month in a given year, the list is formatted to fit into 6 weeks so that
     * it lines up with the correct day of the week the month starts on and what day it ends on. X's are used to fill the gaps at either the beginning
     * or the end of the 6 week period.
     * 
     * @returns A list containing the dates in a specified month padded on either side with X's so the 1st day of the month lines up with the
     * correct day of the week.
     */
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

    /**
     * @summary Gets the integer value of the first day of a given month
     * 
     * @param {DateTime} setMonth - The current month
     * 
     * @description Takes in a given month and returns the integer value for whatever the first day of the month is, this
     * is used by setUpCalendar() when working out how many X's it needs to put at the front of the list so that the first day
     * of the month lines up with the correct day of the week.
     *  
     * @returns An integer value for the day of the week e.g. Monday = 0 and Sunday = 6
     */
    function getFirstDay(setMonth){

        return new Date(year, setMonth-1, 1).getDay()

    }

    /**
     * @summary Gets how many days are in a month
     * 
     * @param {DateTime} setMonth - The current month
     * 
     * @description Takes in a given month and returns the integer value for how many days occur in that given month, this is
     * used by setUpCalendar() to add the correct amount of ordinal dates to the list its building.
     *  
     * @returns Returns an integer value of how many days are in a given month
     */
    function getDaysInMonth(setMonth){

        return new Date(year, setMonth, 0).getDate()

    }

    /**
     * @summary Displays the calendar for the next month to the user
     * 
     * @description When pressed the calendar is redrawn with the ordinal dates occuring in that month and then lines up the first
     * day of the month with the correct day of the week. It also handles updating the year if the user tries to move past December.
     */
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

    /**
     * @summary Displays the calendar for the previous month to the user
     * 
     * @description When pressed the calendar is redrawn with the ordinal dates occuring in that month and then lines up the first
     * day of the month with the correct day of the week. It also handles updating the year if the user tries to move before January.
     */
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

    /**
     * @summary Loads the notes saved to the users account
     * 
     * @summary Queries Firebase to return the notes string that has been previously saved by the user, this string is then
     * inserted into either the text box or scrollable label based on the view type selected (Adult or Child).
     */
    async function loadNotes(){

        const db = firebase.firestore()
    
        const NotesCollection = db.collection("Notes")

        var collections = NotesCollection.where("_UID","==", global.UID)

        collections
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var task = doc.data()
                task.id = doc.id

                setNotes(task['NoteText'])

            })

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


    }

    /**
     * @summary Saves the notes a user has written.
     * 
     * @description Takes the contents of the notes input box and saves a copy of it to Firestore
     */
    function saveNotes(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        firestore.updateNotes(notes)

    }

    if(isLoaded == false){

        loadNotes()

        setLoading(true)

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <CalendarBackground source={(typeof global.background =="number")?MainBackgroundImage:{uri:global.background}}>

            <SettingsTouchable onPress={()=>{openSettings()}} underlayColor={'#00000033'} activeOpacity={1}>

                <FontAwesome name="cog" size={40} color={global.theme} />

            </SettingsTouchable>

            <CalendarContainer>

                <CalendarBody style={{opacity:0.85}}>

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


                    {(global.View == "Adult")?
                    <CalendarNotesContainer>

                        <NotesInput
                        value={notes}
                        placeholder={"Write notes here..."}
                        multiline={true}
                        numberOfLines={4}
                        style={{textAlignVertical:'top'}}
                        onChangeText={text => setNotes(text)}/>

                        <SaveNotesButton onPress={()=>{saveNotes()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

                            <ButtonLabel>SAVE</ButtonLabel>

                        </SaveNotesButton>

                    </CalendarNotesContainer>
                    :
                    <CalendarNotesContainer>

                        <NotesScroll>

                            <NotesText>{notes}</NotesText>

                        </NotesScroll>

                    </CalendarNotesContainer>}

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
    z-index:1000

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
    height:80%
    font-family:Barlow
    font-size:24px
    padding:10px

`

const NotesScroll = styled.ScrollView`

    width:100%
    height:100%

`

const NotesText = styled.Text`

    width:100%
    height:100%
    font-family:Barlow
    font-size:24px
    padding:10px

`

const SaveNotesButton = styled.TouchableHighlight`

    width:${100/3}%
    height:16%
    display:flex
    align-items:center
    justify-content:center
    position:absolute
    right:3%
    bottom:4%
    border-radius:10px

`

const ButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

export default CalendarComponent;
