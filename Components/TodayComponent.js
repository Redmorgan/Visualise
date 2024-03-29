/**
 * @fileoverview The component used for the "Today" tab that displays the tasks the user has occuring on a specified day
 */

import React, {useRef, useState, useEffect} from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useIsFocused} from '@react-navigation/native';

// Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import TimeOfDayComponent from "./TimeOfDayComponent";
import TimeTableTasksComponent from "./TimeTableTasksComponent";

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 * @param {Function} route - Pass through data from the previous layer of the stack.
 *  
 * @returns A component containing a timetable of the tasks occuring for a user on a specified day
 */
const TodayComponent = ({ navigation, route }) => {

    const scrollRef = useRef();

    const [scrollPosition, setScrollPosition] = useState(0)

    const [tasks, setTasks] = useState()

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const [currentDate, setDate] =  useState(new Date())

    const [currentDay, setCurrentDay] = useState("")

    const [isToday, setToday] = useState(false)

    const isFocused = useIsFocused();

    /**
     * @description Loads the page differently based on if its loading "Today" or its loading a specific day from
     * clicking on the calendar. The "Try" is from the calendar, the "Catch" is from "Today".
     */
    useEffect(()=>{
        (async () => {

            try{

                var newDate = new Date(route.params.date)

                setDate(newDate)

                setToday(true)

                setCurrentDay(days[newDate.getDay()])

                await getTasks(newDate, days[newDate.getDay()])

            }catch{

                setCurrentDay(days[currentDate.getDay()])

                getTime()

                await getTasks(new Date(), days[currentDate.getDay()])

            }

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
     * @summary Sets the page scroll to the current time of day
     * 
     * @description When the page loads it collects the current time of day, converts it into seconds, and then converts
     * it into a pixel amount which is used for scrolling the flat list down to the current time of day. This also gets
     * used for setting the indicator bar at the correct place.
     */
    function getTime(){

        const secondsInDay = 86400

        const currentTime = new Date()

        var timeString = moment(currentTime).format("HH:mm:ss")

        var timeSplit = timeString.split(":")

        var seconds = (+timeSplit[0]) * 60 * 60 + (+timeSplit[1]) * 60 + (+timeSplit[2])

        setScrollPosition(((1703/secondsInDay)*seconds)-46)

    }

    /**
     * @summary Collects all the tasks occuring for a user on a selected date.
     * 
     * @param {DateTime} date - The selected date 
     * @param {String}   day - The day of the week "date" occurs on
     * 
     * @description The function collects a list of all the one-off tasks occuring on the selected date, and all of the
     * repeating tasks occuring on the day of the selected date. These tasks are collected from Firestore.
     */
    async function getTasks(date, day){

        var formattedDate = date.setHours(0,0,0,0)

        var newDate = new Date(formattedDate)

        const db = firebase.firestore()

        const TimetableCollection = db.collection("Timetable")

        var collectionSingleTime = []

        var collectionRepeating = []

        var filteredTasks = []

        collectionSingleTime = TimetableCollection.where("_UID","==", global.UID).where("Date","==", newDate)

        collectionRepeating = TimetableCollection.where("_UID","==", global.UID).where("Days","array-contains", day)

        collectionSingleTime
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var task = doc.data()
                task.id = doc.id
                filteredTasks.push(task)

            })

            collectionRepeating
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
    
                    var task = doc.data()
                    task.id = doc.id
                    filteredTasks.push(task)
    
                });

                // sorts by task start time
                filteredTasks.sort((a, b)=> {

                    return a['TimeStart']['seconds'] - b['TimeStart']['seconds']

                })

                setTasks(filteredTasks)
    
            })

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

    /**
     * @summary Takes the user back to the calendar page
     * 
     * @description When a user selects a day on the calendar tab, the TodayComponent opens as a stack rather than a tab.
     * When opened this way the user has access to a back button which will take them back to the calendar page. This function
     * gets run when that button is pressed.
     */
    function backToCalendar(){

        if(global.vibe != 0){

            Vibration.vibrate(5)


        }
        navigation.pop()

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <TodayBackground source={(typeof global.background =="number")?MainBackgroundImage:{uri:global.background}}>

            {(isToday)?
            <BackArrowTouchable onPress={()=>{backToCalendar()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color={global.theme} />

            </BackArrowTouchable>:null}

            {(isToday  == false)?
            <SettingsTouchable onPress={()=>{openSettings()}} underlayColor={'#00000033'} activeOpacity={1}>

                <FontAwesome name="cog" size={40} color={global.theme} />

            </SettingsTouchable>:null}

            <TodayContainer style={{opacity:1}}>

                <TodayBody style={{opacity:0.85}}>

                    <TodayHeader>

                        <HeaderLabel style={{fontFamily:"BarlowSemi"}}>{currentDay}</HeaderLabel>

                        <HeaderLabel style={{fontFamily:"Barlow"}}> - {moment(currentDate).format("DD/MM/YYYY")}</HeaderLabel>

                    </TodayHeader>


                    <TimeTableScroll ref={scrollRef} onContentSizeChange={(contentWidth, contentHeight)=> {scrollRef.current.scrollTo({y:scrollPosition, animated: false})}}>

                        <TimeTableScrollBody>

                            {(isToday)?
                            null:<TimeIndicator style={{top:scrollPosition+34, backgroundColor:global.theme}}/>}

                            <TimeOfDayContainer>

                                <TimeOfDayComponent/>

                            </TimeOfDayContainer>

                            <TimeTableTasksContainer>

                                <TimeTableTasksComponent tasks={tasks}/>

                            </TimeTableTasksContainer>

                        </TimeTableScrollBody>

                    </TimeTableScroll>

                </TodayBody>

            </TodayContainer>

        </TodayBackground>

    </MainView>

    );
}

const MainView = styled.View`

    flex:1;
    display: flex;
    align-items: center;
    justify-content:center;

`

const TodayBackground = styled.ImageBackground`

    width:100%;
    height:100%;
    display: flex;

`

const BackArrowTouchable = styled.TouchableHighlight`

    width:40px
    height:40px
    position:absolute
    left:6%
    top:6%
    display:flex
    justify-content:center
    align-items:center
    border-radius:10px
    z-index:1000

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

const TodayContainer = styled.View`

    width:100%
    height:100%
    align-items:center
    justify-content:center
    margin-top:30px

`

const TodayBody = styled.View`

    width:88%
    height:80.88%
    background-color:#ffffff
    border-radius:10px
    elevation:5

`

const TodayHeader = styled.View`

    width:100%
    height:60px
    border-bottom-width:1px
    border-bottom-color:#000000
    display:flex
    flex-direction:row
    justify-content:center
    align-items:center

`

const HeaderLabel = styled.Text`

    font-size:24px
    color:#000000

`

const TimeTableScroll = styled.ScrollView`

    width:100%
    display:flex
    border-bottom-left-radius:10px
    border-bottom-right-radius:10px
    flex-grow:1
    z-index:20

`

const TimeTableScrollBody = styled.View`

    width:100%
    height:1680px
    flex-direction:row

`

const TimeIndicator = styled.View`

    width:80.1%
    height:3px
    position:absolute
    right:0
    z-index:10

`

const TimeOfDayContainer = styled.View`

    width:20%
    height:100%
    border-color:#000000
    border-right-width:1px

`

const TimeTableTasksContainer = styled.View`

    width:80%
    height:100%
    border-bottom-right-radius:10px

`

export default TodayComponent;
