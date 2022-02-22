import React from "react";
import styled from "styled-components/native";

// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TaskOverviewComponent = ({ view, state, taskOverviewTouchable }) => {

   return (

   <TaskOverviewModal
        visible={state}
        animationType='fade'
        transparent={true}>

        <TaskOverviewContainer>
            
            <TaskOverviewBody>

                {(view == "Adult")?
                <EditButton>

                    <FontAwesome5 name="pen" size={30} color="black" />

                </EditButton>:null}

                <CloseButton onPress={()=>{taskOverviewTouchable()}} underlayColor={'#00000033'} activeOpacity={1}>

                    <AntDesign name="close" size={35} color="black" />

                </CloseButton>

                <TaskIcon></TaskIcon>

                <TaskHeaderLabel>Task</TaskHeaderLabel>

                <TaskTimeLabel>1-2pm</TaskTimeLabel>

                <TaskDescriptionWrapper>

                    <TaskDescriptionScroll>

                        <TaskDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non massa at neque suscipit varius non sed dolor. Suspendisse cursus faucibus varius. Morbi et bibendum ligula. Nullam pulvinar odio neque, vitae tempor metus bibendum placerat.</TaskDescription>

                    </TaskDescriptionScroll>

                </TaskDescriptionWrapper>

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

    width:85%;
    height:50.55%;
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
    border-radius:90px

`

const TaskIcon = styled.View`

    width:120px
    height:120px
    border-radius:90px
    background-color:red
    margin-top:3.2%


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

const TaskDescriptionWrapper = styled.View`

    width:90%
    height:30%
    margin-top:1.2%

`

const TaskDescriptionScroll = styled.ScrollView`

    width:100%

`

const TaskDescription = styled.Text`

    width:100%
    font-family:Barlow
    font-size:18px

`


export default TaskOverviewComponent;
