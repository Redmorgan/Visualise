import React from "react";
import styled from "styled-components/native";

// Icons
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const EditTaskComponent = ({ }) => {

   return (

    <EditTaskModal
        visible={true}
        animationType='fade'
        transparent={true}>

        <EditTaskContainer>
            
            <EditTaskBody>


            </EditTaskBody>
            
        </EditTaskContainer>

    </EditTaskModal>

   );
}

const EditTaskModal = styled.Modal`
`

const EditTaskContainer = styled.View`

    flex:1
    justify-content:center;
    align-items:center;
    background-color: rgba(181,181,181,0.5);

`

const EditTaskBody = styled.View`

    width:350px;
    height:500px;
    background-color:#ffffff;
    border-radius:10px;
    align-items:center;
    elevation:4

`


export default EditTaskComponent;
