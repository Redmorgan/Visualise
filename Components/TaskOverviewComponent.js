/**
 * @fileoverview The component used for the pop-up that displays the task information when a task is pressed on the "Today" tab.
 */

import React from "react";
import styled from "styled-components/native";
import moment from 'moment';

// Icons
import { AntDesign } from '@expo/vector-icons';

/**
 * @param {Boolean}   state - The current visibile state of the pop-up (True = Visible, False = Invisible). 
 * @param {Function}  closeTaskOverview - Function for closing the task overview modal
 * @param {String}    name - The name of the task
 * @param {String}    desc - The task's description
 * @param {DateTime}  start - The start time of the task
 * @param {DateTime}  end - The end time of the task
 *  
 * @returns A modal which contains the full name of the task, the exact time frame the task covers, and the set
 * description for the task.
 */
const TaskOverviewComponent = ({ state, closeTaskOverview, name, desc, start, end }) => {

    return (

    <TaskOverviewModal
        visible={state}
        animationType='fade'
        transparent={true}>

        <TaskOverviewContainer>
            
            <TaskOverviewBody>

                <CloseButton onPress={()=>{closeTaskOverview()}} underlayColor={'#00000033'} activeOpacity={1}>

                    <AntDesign name="close" size={35} color="black" />

                </CloseButton>

                <TaskHeaderLabel>{name}</TaskHeaderLabel>

                {(global.time == "24-hour")?
                <TaskTimeLabel>{moment(new Date(start)).format("HH:mm")}-{moment(new Date(end)).format("HH:mm")}</TaskTimeLabel>
                :
                <TaskTimeLabel>{moment(new Date(start)).format("h:mma")}-{moment(new Date(end)).format("h:mma")}</TaskTimeLabel>}

                <TaskDescriptionWrapper>

                    <TaskDescriptionScroll>

                        <TaskDescription>{desc}</TaskDescription>

                    </TaskDescriptionScroll>

                </TaskDescriptionWrapper>

            </TaskOverviewBody>
            
        </TaskOverviewContainer>

    </TaskOverviewModal>

    );
}

const TaskOverviewModal = styled.Modal`
`

const TaskOverviewContainer = styled.View`

    flex:1
    justify-content:center;
    align-items:center;
    background-color: rgba(181,181,181,0.5);

`

const TaskOverviewBody = styled.View`

    width:85%;
    height:40%;
    background-color:#ffffff;
    border-radius:10px;
    align-items:center;
    elevation:4

`

const CloseButton = styled.TouchableHighlight`

    width:35px
    height:35px
    position:absolute
    right:11px
    top:11px
    border-radius:90px

`

const TaskHeaderLabel = styled.Text`

    width:100%
    font-family:BarlowSemi
    font-size:36px
    text-align:center
    margin-top:11%

`

const TaskTimeLabel = styled.Text`

    width:100%
    font-family:Barlow
    font-size:24px
    text-align:center

`

const TaskDescriptionWrapper = styled.View`

    width:90%
    height:50%
    margin-top:3.2%

`

const TaskDescriptionScroll = styled.ScrollView`

    width:100%

`

const TaskDescription = styled.Text`

    width:100%
    font-family:Barlow
    font-size:22px

`

export default TaskOverviewComponent;
