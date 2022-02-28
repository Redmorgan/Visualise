import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import moment from 'moment';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TaskManagerItemComponent = ({  taskName, taskRepeat, date, startTime, openDelete, openTaskEditor }) => {

    const[timingState, setTiming] = useState()

    useEffect(()=>{
        (async () => {
    
            if(taskRepeat == true){

                setTiming("Repeating")
        
            }else{
        
                var timingString = moment.utc(startTime*1000).format('HH:mm') + " - " + moment.utc(date*1000).format('DD/MM/YYYY')

                setTiming(timingString)
        
            }
    
        })()
    },[])

    return (

    <TaskContainer>

        <TaskInfoContainer>

            <TaskLabel>{taskName}</TaskLabel>

            <TaskSubLabel>{timingState}</TaskSubLabel>

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
