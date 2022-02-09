import React from "react";
import styled from "styled-components/native";

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TaskManagerItemComponent = ({ taskName, taskRepeat }) => {

   return (

   <TaskContainer>

        <TaskInfoContainer>

            <TaskLabel>{taskName}</TaskLabel>

            <TaskSubLabel>{taskRepeat}</TaskSubLabel>

        </TaskInfoContainer>

        <TaskControlsContainer>

            <EditButton>

                <FontAwesome5 name="pen" size={30} color="black" />

            </EditButton>

            <DeleteButton>

                <AntDesign name="close" size={35} color="black" />

            </DeleteButton>


        </TaskControlsContainer>

   </TaskContainer>

   );
}

const TaskContainer = styled.View`

   width:100%
   height:90px
   display:flex
   flex-direction:row
   border-radius:10px
   background-color:#ffffff
   elevation:5
   margin-bottom:14px

`

const TaskInfoContainer = styled.View`

    height:100%
    width:230px
    padding-left:22px
    display:flex
    justify-content:center

`

const TaskLabel = styled.Text`

    font-family:BarlowSemi
    font-size:30px
    color:#000000

`

const TaskSubLabel = styled.Text`

    font-family:BarlowSemi
    font-size:15px
    color:#514F4F


`

const TaskControlsContainer = styled.View`

    width:120px
    height:100%
    display:flex
    flex-direction:row
    justify-content:space-around
    align-items:center

`

const EditButton = styled.TouchableHighlight`

    width:35px
    height:35px

`

const DeleteButton = styled.TouchableHighlight`

    width:35px
    height:35px

`


export default TaskManagerItemComponent;
