/**
 * @fileoverview Component for the tasks that appear on the "Today" tab to depict the tasks the user has created.
 */

import React, { useState } from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";

// Components
import TaskOverviewComponent from "./TaskOverviewComponent";

/**
 * @param {Object} Task - Contains the data about the task, e.g. Name, Task Colour, and Task Length
 *  
 * @returns A compnent consisting of a task name and a rectangle with a length that comes from the "Task" param.
 */
const TaskComponent = ({ task }) => {

    const [overviewState, setOverviewState] = useState(false)

    /**
     * @summary Opens the description pop-up of a task
     * 
     * @description When the user clicks on a task it opens a pop up which contains the full name of the task,
     * the exact time frame the task covers, and the set description for the task.
     */
    function openTaskDesc(){

        if(task['name'] != ""){

            if(global.vibe != 0){

                Vibration.vibrate(5)

            }

            setOverviewState(true)

        }

    }

    /**
     * @summary Closes the description pop-up of a task
     * 
     * @description When the user clicks on the X button on the description modal it will close it.
     */
    function closeTaskDesc(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setOverviewState(false)

    }

    return (

    <TaskBody style={{height:task['length']}} onPress={()=>{openTaskDesc()}} underlayColor={'transparent'} activeOpacity={1}>

        <TaskWrapper>

            <TaskLabelWrapper>

                <TaskLabel>{task['name']}</TaskLabel>

            </TaskLabelWrapper>

            <TaskLength style={{backgroundColor:task['colour'], height:task['length']}}/>

            <TaskOverviewComponent view={global.View} state={overviewState} closeTaskOverview={()=>{closeTaskDesc()}} name={task['name']} desc={task['desc']} start={task['start']} end={task['end']}/>

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
    padding-left:5%

`

const TaskLabel = styled.Text`

    font-family:BarlowBold
    font-size:25px

`

export default TaskComponent;
