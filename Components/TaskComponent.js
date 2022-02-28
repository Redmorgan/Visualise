import React from "react";
import styled from "styled-components/native";

// Icons
import { Ionicons } from '@expo/vector-icons';


const TaskComponent = ({length, name, colour, type, openTaskOverView }) => {


   return (

   <TaskBody style={{height:length}}>

        <TaskLabelWrapper>

            <TaskLabel>{name}</TaskLabel>

        </TaskLabelWrapper>

        <TaskOverviewTouchable onPress={()=>{openTaskOverView()}}>

            <TaskIcon style={{backgroundColor:colour}}>

                <Ionicons name={type} size={45} color="white" />

            </TaskIcon>

        </TaskOverviewTouchable>

        <TaskLength style={{backgroundColor:colour, height:length-20}}/>       

   </TaskBody>

   );
}

const TaskBody = styled.View`

   width:100%
   display: flex;

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

    width:18px
    position:absolute
    right:16%
    bottom:0
    border-radius:10px

`

const TaskLabelWrapper = styled.View`

    width:100%
    height:70px
    justify-content:center
    padding-left:5%

`

const TaskLabel = styled.Text`

    font-family:BarlowBold
    font-size:20px

`

export default TaskComponent;
