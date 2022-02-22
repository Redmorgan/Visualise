import React from "react";
import styled from "styled-components/native";

// Icons
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const DeleteTaskComponent = ({ state, closeDelete }) => {

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

                    <ConfirmDeleteButton underlayColor={'#00000033'} activeOpacity={1}>

                        <Entypo name="check" size={50} color="black" />

                    </ConfirmDeleteButton>

                    <CancelDeleteButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{closeDelete()}}>

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
