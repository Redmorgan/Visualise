import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import moment from 'moment';
import { Vibration } from "react-native";

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Components
import DeleteTaskComponent from "./DeleteTaskComponent";

const TaskManagerItemComponent = ({  taskData, openTaskEditor, refreshTasks }) => {

    const[timingState, setTiming] = useState()
    const[deleteState, setDeleteState] = useState(false)

    useEffect(()=>{
        (async () => {
    
            if(taskData["Repeating"] == true){

                setTiming("Repeating")
        
            }else{
        
                var timingString = moment.utc(taskData['TimeStart']['seconds']*1000).format('HH:mm') + " - " + moment.utc(taskData['Date']['seconds']*1000).format('DD/MM/YYYY')

                setTiming(timingString)
        
            }
    
        })()
    },[taskData])

    function openDelete(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setDeleteState(true)

    }

    return (

    <TaskContainer>

        <TaskInfoContainer>

            <TaskLabel>{taskData["TaskName"]}</TaskLabel>

            <TaskSubLabel>{timingState}</TaskSubLabel>

        </TaskInfoContainer>

        <TaskControlsContainer>

            <EditButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTaskEditor(taskData)}}>

                <FontAwesome5 name="pen" size={30} color="black" />

            </EditButton>

            <DeleteButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openDelete()}}>

                <AntDesign name="close" size={35} color="black" />

            </DeleteButton>

        </TaskControlsContainer>

        <DeleteTaskComponent state={deleteState} closeDelete={()=>{setDeleteState(false)}} taskID={taskData['docID']} refreshTasks={refreshTasks}/>

    </TaskContainer>

    );
}

const TaskContainer = styled.View`

   width:100%
   height:90px
   display:flex
   flex-direction:row
   background-color:#ffffff
   elevation:5
   border-radius:10px
   margin-bottom:4%

`

const TaskInfoContainer = styled.View`

    height:100%
    width:60%
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

    width:40%
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
