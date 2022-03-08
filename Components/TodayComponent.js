
 import React, {useRef, useState, useEffect} from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 import moment from 'moment';
 
 // Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import TimeOfDayComponent from "./TimeOfDayComponent";
import TimeTableTasksComponent from "./TimeTableTasksComponent";
import TaskOverviewComponent from "./TaskOverviewComponent";

// Icons
import { FontAwesome } from '@expo/vector-icons'


const TodayComponent = ({ navigation }) => {

    const scrollRef = useRef();

    const [scrollPosition, setScrollPosition] = useState(0)

    const[taskOverviewState, setTaskOverviewState] = useState(false)

    useEffect(()=>{
        (async () => {
    
            getTime()
    
        })()
    },[])

    function openSettings(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.push("Settings")

    }

    function getTime(){

        const secondsInDay = 86400

        const currentTime = new Date()

        var timeString = moment(currentTime).format("HH:mm:ss")

        var timeSplit = timeString.split(":")

        var seconds = (+timeSplit[0]) * 60 * 60 + (+timeSplit[1]) * 60 + (+timeSplit[2])

        setScrollPosition(((1680/secondsInDay)*seconds)-35)

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <TodayBackground source={MainBackgroundImage}>

            <SettingsTouchable onPress={()=>{openSettings()}} underlayColor={'#00000033'} activeOpacity={1}>

                <FontAwesome name="cog" size={40} color={"#8A84FF"} />

            </SettingsTouchable>

            <TaskOverviewComponent view={global.View} state={taskOverviewState} taskOverviewTouchable={()=>{setTaskOverviewState(false)}}/>

            <TodayContainer>

                <TodayBody>

                    <TodayHeader>

                        <HeaderLabel style={{fontFamily:"BarlowSemi"}}>Monday</HeaderLabel>

                        <HeaderLabel style={{fontFamily:"Barlow"}}> - 31/01/2022</HeaderLabel>

                    </TodayHeader>

                    
                    <TimeTableScroll ref={scrollRef} onContentSizeChange={(contentWidth, contentHeight)=> {scrollRef.current.scrollTo({y:scrollPosition, animated: false})}}>

                        <TimeTableScrollBody>

                            <TimeIndicator style={{top:scrollPosition+35}}/>

                            <TimeOfDayContainer>

                                <TimeOfDayComponent/>

                            </TimeOfDayContainer>

                            <TimeTableTasksContainer>

                                <TimeTableTasksComponent openTaskOverView={()=>{setTaskOverviewState(true)}}/>

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

const TodayContainer = styled.View`

    width:100%
    height:100%
    align-items:center
    justify-content:center
    margin-top:30px

`

const TodayBody = styled.View`

    width:86%
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

    width:80%
    height:3px
    background-color:#8A84FF
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
 