
 import React, {useRef, useEffect} from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import TimeOfDayComponent from "./TimeOfDayComponent";
import TimeTableTasksComponent from "./TimeTableTasksComponent";
import TaskOverviewComponent from "./TaskOverviewComponent";


const TodayComponent = ({  }) => {

    const scrollRef = useRef();

    const scollPosition = 630

    //scrollRef.current.scrollTo({y:scollPosition, animated: false})

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <TodayBackground source={MainBackgroundImage}>

            <TaskOverviewComponent view="Adult"/>
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

                            <TimeOfDayContainer>

                                <TimeOfDayComponent/>

                            </TimeOfDayContainer>

                            <TimeTableTasksContainer>

                                <TimeTableTasksComponent/>

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
    margin-left:30px
    margin-top: 30px
    border-radius:90px
    align-items:center
    justify-content:center

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
 