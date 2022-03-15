import React, { useState } from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";

import TaskOverviewComponent from "./TaskOverviewComponent";

const TaskComponent = ({task}) => {

    const [overviewState, setOverviewState] = useState(false)

    function openTaskDesc(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setOverviewState(true)

    }

   return (

   <TaskBody style={{height:task['length']+5}} onPress={()=>{openTaskDesc()}} underlayColor={'transparent'} activeOpacity={1}>

        <TaskWrapper>

            <TaskLabelWrapper>

                <TaskLabel>{task['name']}</TaskLabel>

            </TaskLabelWrapper>

            <TaskLength style={{backgroundColor:task['colour'], height:task['length']}}/>

            <TaskOverviewComponent view={global.View} state={overviewState} taskOverviewTouchable={()=>{setOverviewState(false)}} name={task['name']} desc={task['desc']} start={task['start']} end={task['end']}/>

        </TaskWrapper>

   </TaskBody>

   );
}

const TaskBody = styled.TouchableHighlight`

   width:100%
   display: flex;

`

const TaskWrapper = styled.View`

    width:100%
    height:100%

`

const TaskOverviewTouchable = styled.TouchableHighlight`

    width:70px
    height:70px
    border-radius:90px
    position:absolute
    right:5%
    z-index:2

`

const TaskIcon = styled.View`

    width:100%
    height:100%
    border-radius:90px
    display:flex
    align-items:center
    justify-content:center

`

const TaskLength = styled.View`

    width:15%
    position:absolute
    right:5%
    border-top-left-radius:5px
    border-top-right-radius:5px
    border-bottom-left-radius:15px
    border-bottom-right-radius:15px

`

const TaskLabelWrapper = styled.View`

    width:100%
    display:flex
    justify-content:center
    padding-left:5%

`

const TaskLabel = styled.Text`

    font-family:BarlowBold
    font-size:25px
    line-height: 22px

`

export default TaskComponent;
