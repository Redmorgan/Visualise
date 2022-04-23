/**
 * @fileoverview Contains the component that is used as the pop-up for when a user tries to delete a task.
 * Gives the user the option to either confirm or cancel the deletion.
 */

import React from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";
import * as firebase from '../firebaseConfig.js'

// Icons
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

/**
 * 
 * @param {Boolean}  state - The current visibile state of the pop-up (True = Visible, False = Invisible)
 * @param {Function} closeDelete - The function that closes the delete task modal
 * @param {String}   taskID - The docID of the task that has been selected for deletion
 * @param {Function} refreshTasks - The function that refreshes the tasks displayed, used to remove the deleted task from the screen.
 *  
 * @returns - A pop-up that can be used to confirm or cancel the deletion of a task.
 * 
 */
const DeleteTaskComponent = ({ state, closeDelete, taskID, refreshTasks }) => {

    /**
     * @summary Closes the delete pop-up
     * 
     * @description If the user wants to cancel the deletion of the task they can press the X button and it will run this
     * function which will then hide the delete task modal.
     */
    function cancelDelete(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        closeDelete()

    }

    /**
     * @summary Confirms the deletion of the task
     * 
     * @description If the user wants to confirm the deletion of the task they can press the tick button and it will remove the task
     * from firestore, refresh the tasks on the page to remove the old component, then close the delete task modal.
     */
    async function confirmDelete(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        await firebase.deleteTask(taskID)

        refreshTasks()

        refreshTasks()

        closeDelete()

    }

    return (

    <DeleteTaskModal
        visible={state}
        animationType='fade'
        transparent={true}>

        <DeleteTaskContainer>

            <DeleteTaskBody>

                <MaterialIcons name="error" size={80} color="red" style={{marginTop:20}}/>

                <DeleteInfoLabel>Are you sure you want to delete this task?</DeleteInfoLabel>

                <DeleteControlsContainer>

                    <ConfirmDeleteButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{confirmDelete()}}>

                        <Entypo name="check" size={50} color="black" />

                    </ConfirmDeleteButton>

                    <CancelDeleteButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{cancelDelete()}}>

                        <Entypo name="cross" size={50} color="black" /> 

                    </CancelDeleteButton>

                </DeleteControlsContainer>

            </DeleteTaskBody>
            
        </DeleteTaskContainer>

    </DeleteTaskModal>

    );
}

const DeleteTaskModal = styled.Modal`
`

const DeleteTaskContainer = styled.View`

    flex:1
    justify-content:center;
    align-items:center;
    background-color: rgba(181,181,181,0.5);

`

const DeleteTaskBody = styled.View`

    width:85%
    height:36.10%
    background-color:#ffffff;
    border-radius:10px;
    align-items:center;
    elevation:4

`

const DeleteInfoLabel = styled.Text`

    font-family:Barlow
    font-size:24px
    width:80%
    text-align:center
    margin-top:1.2%

`

const DeleteControlsContainer = styled.View`

    width:80%
    height:50px
    margin-top:2.4%
    flex-direction:row
    justify-content:space-around

`

const ConfirmDeleteButton = styled.TouchableHighlight`

    border-radius:90px

`

const CancelDeleteButton = styled.TouchableHighlight`

    border-radius:90px

`

export default DeleteTaskComponent;
