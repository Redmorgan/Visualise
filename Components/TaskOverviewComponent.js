import React from "react";
import styled from "styled-components/native";

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TaskOverviewComponent = ({ view }) => {

   return (

   <TaskOverviewModal
        visible={false}
        animationType='fade'
        transparent={true}>

        <TaskOverviewContainer>
            
            <TaskOverviewBody>

                {(view == "Adult")?
                <EditButton>

                    <FontAwesome5 name="pen" size={30} color="black" />

                </EditButton>:null}

                <CloseButton>

                    <AntDesign name="close" size={35} color="black" />

                </CloseButton>

                <TaskIcon></TaskIcon>

                <TaskHeaderLabel>Task</TaskHeaderLabel>

                <TaskTimeLabel>1-2pm</TaskTimeLabel>

                <TaskDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non massa at neque suscipit varius non sed dolor. Suspendisse cursus faucibus varius. Morbi et bibendum ligula. Nullam pulvinar odio neque, vitae tempor metus bibendum placerat.</TaskDescription>

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
    height:419px;
    background-color:#ffffff;
    border-radius:10px;
    align-items:center;
    elevation:4

`

const EditButton = styled.TouchableHighlight`

    width:35px
    height:35px
    position:absolute
    left:14px
    top:14px

`

const CloseButton = styled.TouchableHighlight`

    width:35px
    height:35px
    position:absolute
    right:11px
    top:11px

`

const TaskIcon = styled.View`

    width:128px
    height:128px
    border-radius:90px
    background-color:red
    margin-top:27px


`

const TaskHeaderLabel = styled.Text`

    width:100%
    font-family:BarlowSemi
    font-size:36px
    text-align:center

`

const TaskTimeLabel = styled.Text`

    width:100%
    font-family:Barlow
    font-size:24px
    text-align:center

`

const TaskDescription = styled.Text`

    width:90%
    font-family:Barlow
    font-size:18px
    margin-top:10px

`


export default TaskOverviewComponent;
