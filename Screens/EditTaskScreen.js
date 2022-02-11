
 import React, {useState} from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 import DateTimePicker from '@react-native-community/datetimepicker';
 import moment from 'moment';
 
 // Images
 import MainBackgroundImage from '../Images/MainBackground.png'

 // Icons
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const EditTaskScreen = ({ navigation }) => {

    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

    function onDateChange(event, selectedDate){
        const currentDate = selectedDate || date
        setDate(currentDate)
        setShow(false)
    }

    function goBack(){

        Vibration.vibrate(5)
        navigation.pop()

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <EditTaskBackground source={MainBackgroundImage}>

            <HeaderBar>

                <BackArrowTouchable onPress={()=>{goBack()}} underlayColor={"transparent"}>

                    <AntDesign name="arrowleft" size={40} color="#ffffff" />

                </BackArrowTouchable>

                <HeaderLabel>Create new Task</HeaderLabel>

            </HeaderBar>

            <TaskIcon>

                <TaskIconLabel>No image</TaskIconLabel>

            </TaskIcon>

            <EditTaskBody>

                <TaskDataLabel>Task Name</TaskDataLabel>
                <TaskNameInput/>

                <TaskDataLabel>Description</TaskDataLabel>
                <TaskDescInput multiline={true} numberOfLines={4} style={{textAlignVertical: 'top'}}/>

                <TaskDataLabel>Task Date</TaskDataLabel>

                <TaskDateContainer>

                    <TaskDateInput placeholder={moment(date).format("DD/MM/YYYY")}/>
                    {show &&
                    <DateTimePicker 
                        value={ date }
                        mode='default'
                        display='default'
                        onChange={onDateChange}
                    />}

                    <TaskDateTouchable onPress={()=>{setShow(true)}} underlayColor={'#00000033'} activeOpacity={1}>

                        <Entypo name="calendar" size={50} color="#8A84FF" />

                    </TaskDateTouchable>

                </TaskDateContainer>

            </EditTaskBody>

        </EditTaskBackground>

    </MainView>
 
    );
}
 
const MainView = styled.View`
 
    flex:1;
    display: flex;
    align-items: center;
    justify-content:center;
 
`
 
const EditTaskBackground = styled.ImageBackground`
 
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
 
`

const HeaderBar = styled.View`

    width:100%
    height:100px
    background-color:#8A84FF
    align-items:center
    justify-content:center

`

const HeaderLabel = styled.Text`

    font-family:BarlowSemi
    font-size:32px
    color:#ffffff
    margin-top:15px

`

const BackArrowTouchable = styled.TouchableHighlight`

    width:40px
    height:40px
    border-radius:90px
    align-items:center
    justify-content:center
    position:absolute
    left:17px
    top:40px

`

const EditTaskBody = styled.View`

    width:350px

`

const TaskIcon = styled.View`

    width:128px
    height:128px
    background-color:#ffffff
    border-radius:90px
    margin-top:19px
    display:flex
    justify-content:center
    align-items:center

`

const TaskIconLabel = styled.Text`

    font-family:Barlow
    font-size:24px

`

const TaskDataLabel = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-bottom:7px

`

const TaskNameInput = styled.TextInput`

    width:350px
    height:53px
    border-radius:10px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5
    margin-bottom:14px

`

const TaskDescInput = styled.TextInput`

    width:350px
    height:106px
    border-radius:10px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding:10px
    elevation:5
    margin-bottom:14px

`

const TaskDateContainer = styled.View`

    width:350px
    height:100px
    display:flex
    flex-direction:row

`

const TaskDateInput = styled.TextInput`

    width:290px
    height:53px
    border-radius:10px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5
    margin-bottom:14px

`

const TaskDateTouchable = styled.TouchableHighlight`

    width:53px
    height:53px
    margin-left:7px
    display:flex
    justify-content:center
    align-items:center
    border-radius:10px

`


export default EditTaskScreen;
 