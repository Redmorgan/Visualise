import React from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TaskManagerItemComponent = ({  taskName, taskRepeat, openDelete }) => {

    const navigation = useNavigation();

    function openTaskEditor(){

        Vibration.vibrate(5)
        navigation.push("EditTask")

    }

   return (

   <TaskContainer>

        <TaskInfoContainer>

            <TaskLabel>{taskName}</TaskLabel>

            <TaskSubLabel>{taskRepeat}</TaskSubLabel>

        </TaskInfoContainer>

        <TaskControlsContainer>

            <EditButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTaskEditor()}}>

                <FontAwesome5 name="pen" size={30} color="black" />

            </EditButton>

            <DeleteButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openDelete()}}>

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
    display:flex
    justify-content:space-around
    align-items:center
    border-radius:10px

`

const DeleteButton = styled.TouchableHighlight`

    width:35px
    height:35px
    border-radius:10px

`


export default TaskManagerItemComponent;
