import React from "react";
import styled from "styled-components/native";

// Icons
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const DeleteTaskComponent = ({ state, closeDelete }) => {

   return (

   <TaskOverviewModal
        visible={state}
        animationType='fade'
        transparent={true}>

        <TaskOverviewContainer>
            
            <TaskOverviewBody>

                <MaterialIcons name="error" size={100} color="red" style={{marginTop:20}}/>

                <DeleteInfoLabel>Are you sure you want to delete this task?</DeleteInfoLabel>

                <DeleteControlsContainer>

                    <ConfirmDeleteButton underlayColor={'#00000033'} activeOpacity={1}>

                        <Entypo name="check" size={50} color="black" />

                    </ConfirmDeleteButton>

                    <CancelDeleteButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{closeDelete()}}>

                        <Entypo name="cross" size={50} color="black" /> 

                    </CancelDeleteButton>

                </DeleteControlsContainer>

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

    width:350px;
    height:300px;
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
    margin-top:10px

`

const DeleteControlsContainer = styled.View`

    width:80%
    height:50px
    margin-top:20px
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
