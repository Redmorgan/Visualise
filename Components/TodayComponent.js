
 import React, {useRef, useState} from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
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

    const scollPosition = 630

    const[taskOverviewState, setTaskOverviewState]=useState(false)

    //scrollRef.current.scrollTo({y:scollPosition, animated: false})

    //const navigation = useNavigation();

    function openSettings(){

        Vibration.vibrate(5)
        navigation.push("Settings")

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <TodayBackground source={MainBackgroundImage}>

            <SettingsTouchable onPress={()=>{openSettings()}} underlayColor={'#00000033'} activeOpacity={1}>

                <FontAwesome name="cog" size={40} color={"#8A84FF"} />

            </SettingsTouchable>

            <TaskOverviewComponent view={global.View} state={taskOverviewState} taskOverviewTouchable={()=>{setTaskOverviewState(false)}}/>
{/* 
            <BackArrowTouchable onPress={()=>{backToLogin()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color="#8A84FF" />

            </BackArrowTouchable> */}

            <TodayContainer>

                <TodayBody>

                    <TodayHeader>

                        <HeaderLabel style={{fontFamily:"BarlowSemi"}}>Monday</HeaderLabel>

                        <HeaderLabel style={{fontFamily:"Barlow"}}> - 31/01/2022</HeaderLabel>

                    </TodayHeader>

                    
                    <TimeTableScroll ref={scrollRef} onContentSizeChange={(contentWidth, contentHeight)=> {scrollRef.current.scrollTo({y:scollPosition, animated: false})}}>

                        <TimeTableScrollBody>

                            <TimeIndicator style={{top:900}}/>

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
    right:25px
    top:30px
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

    width:350px
    height:672px
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

    width:350px
    height:612px
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

    width:281px
    height:3px
    background-color:#8A84FF
    position:absolute
    right:0
    z-index:10

`

const TimeOfDayContainer = styled.View`

    width:70px
    height:100%
    border-color:#000000
    border-right-width:1px

`

const TimeTableTasksContainer = styled.View`

    width:280px
    height:100%
    border-bottom-right-radius:10px

`

export default TodayComponent;
 