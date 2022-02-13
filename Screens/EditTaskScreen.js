
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
    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    const [selectedDays, setSelectedDays] = useState([])
    const [refreshState, setRefreshing] = useState(false)
    const [selectedDaysString, setSelectedDaysString] = useState()

    const [selected, setSelected] = useState()
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(moment(new Date()).add(1, 'h').toDate())


    function onDateChange(event, selectedDate){

        const currentDate = selectedDate || date

        setDate(currentDate)
        setShowDate(false)
        //setSelectedDays([])

    }

    function onTimeChange(event, selectedDate){

        const currentDate = selectedDate || date

        if(selected == "start"){

            setStartTime(currentDate)

        }else if(selected == "end"){

            setEndTime(currentDate)

        }

        setShowTime(false)

    }

    function goBack(){

        Vibration.vibrate(5)
        navigation.pop()

    }

    function openDatePicker(){

        Vibration.vibrate(5)
        setSelected("date")
        setShowDate(true)

    }

    function openStartTime(){

        Vibration.vibrate(5)
        setSelected("start")
        setShowTime(true)

    }

    function openEndTime(){

        Vibration.vibrate(5)
        setSelected("end")
        setShowTime(true)

    }

    function setDay(day){

        Vibration.vibrate(5)

        var selectedDaysUpdated = selectedDays

        if(selectedDaysUpdated.includes(day)){

            const index = selectedDaysUpdated.indexOf(day);
            selectedDaysUpdated.splice(index, 1)
            setSelectedDays(selectedDaysUpdated)

        }else{

            selectedDaysUpdated.push(day)
            setSelectedDays(selectedDaysUpdated)

        }

        var selectedDaysStringUpdated = ""

        if(selectedDaysUpdated.length == 7){

            selectedDaysStringUpdated = "Every day"

        }else{

            for(let i = 0; i < selectedDaysUpdated.length; i++){

                if(i == selectedDaysUpdated.length-1){

                    selectedDaysStringUpdated += selectedDaysUpdated[i].substring(0,3)

                }else{

                    selectedDaysStringUpdated += (selectedDaysUpdated[i].substring(0,3) + ", ")

                }

            }
        
        }

        setSelectedDaysString(selectedDaysStringUpdated)

        setRefreshing(!refreshState)

    }

    function cancelTask(){

        Vibration.vibrate(5)
        navigation.pop()

    }

    function saveTask(){

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

                    <TaskDateInput
                        editable={selectedDays.length == 0 ? true:false}
                        value={selectedDays.length == 0 ? moment(date).format("DD/MM/YYYY"): selectedDaysString}/>

                    {(showDate == true)?
                    <DateTimePicker 
                        value={ date }
                        mode={'date'}
                        display='default'
                        onChange={onDateChange}
                    />:null}

                    <TaskDateTouchable onPress={()=>{openDatePicker()}} underlayColor={'#00000033'} activeOpacity={1}>

                        <Entypo name="calendar" size={50} color="#8A84FF" />

                    </TaskDateTouchable>

                </TaskDateContainer>

                
                <DaysOfWeekContainer>

                    <DayIconTouchable onPress={()=>{setDay("Monday")}}>

                        <DayIcon style={{borderWidth:selectedDays.includes("Monday")?2:0}}>

                            <DayLabel>M</DayLabel>

                        </DayIcon>

                    </DayIconTouchable>

                    <DayIconTouchable onPress={()=>{setDay("Tuesday")}}>

                        <DayIcon style={{borderWidth:selectedDays.includes("Tuesday")?2:0}}>

                            <DayLabel>T</DayLabel>

                        </DayIcon>

                    </DayIconTouchable>

                    <DayIconTouchable onPress={()=>{setDay("Wednesday")}}>

                        <DayIcon style={{borderWidth:selectedDays.includes("Wednesday")?2:0}}>

                            <DayLabel>W</DayLabel>

                        </DayIcon>

                    </DayIconTouchable>

                    <DayIconTouchable onPress={()=>{setDay("Thursday")}}>

                        <DayIcon style={{borderWidth:selectedDays.includes("Thursday")?2:0}}>

                            <DayLabel>T</DayLabel>

                        </DayIcon>

                    </DayIconTouchable>

                    <DayIconTouchable onPress={()=>{setDay("Friday")}}>

                        <DayIcon style={{borderWidth:selectedDays.includes("Friday")?2:0}}>

                            <DayLabel>F</DayLabel>

                        </DayIcon>

                    </DayIconTouchable>

                    <DayIconTouchable onPress={()=>{setDay("Saturday")}}>

                        <DayIcon style={{borderWidth:selectedDays.includes("Saturday")?2:0}}>

                            <DayLabel>S</DayLabel>

                        </DayIcon>

                    </DayIconTouchable>

                    <DayIconTouchable onPress={()=>{setDay("Sunday")}}>

                        <DayIcon style={{borderWidth:selectedDays.includes("Sunday")?2:0}}>

                            <DayLabel>S</DayLabel>

                        </DayIcon>

                    </DayIconTouchable>

                </DaysOfWeekContainer>

                <TimeContainer>

                    <TaskTimeContainer>

                        <TaskDataLabel>Start Time</TaskDataLabel>
                        
                        <TaskTimeWrapper>

                            <TimeInput
                                editable={false}
                                value={moment(startTime).format("HH:mm")}/>

                            <ClockTouchable onPress={()=>{openStartTime()}}  underlayColor={'#00000033'} activeOpacity={1}>

                                <AntDesign name="clockcircle" size={50} color="#8A84FF" />

                            </ClockTouchable>

                        </TaskTimeWrapper>

                    </TaskTimeContainer>

                    <TaskTimeContainer style={{marginLeft:"5%"}}>

                        <TaskDataLabel>End Time</TaskDataLabel>
                        
                        <TaskTimeWrapper>

                            <TimeInput
                                value={moment(endTime).format("HH:mm")}
                                editable={false}/>

                            <ClockTouchable onPress={()=>{openEndTime()}}  underlayColor={'#00000033'} activeOpacity={1}>

                                <AntDesign name="clockcircle" size={50} color="#8A84FF" />

                            </ClockTouchable>

                        </TaskTimeWrapper>

                    </TaskTimeContainer>

                    {(showTime == true)?
                    <DateTimePicker 
                        value={ date }
                        mode={'time'}
                        display='default'
                        onChange={onTimeChange}
                    />:null}
                
                </TimeContainer>

                <TaskButtonsContainer>

                    <SaveTaskButton onPress={()=>{saveTask()}} underlayColor={'#6964c4'} activeOpacity={1}>

                        <SaveTaskLabel>Save</SaveTaskLabel>

                    </SaveTaskButton>

                    <CancelTaskButton onPress={()=>{cancelTask()}} underlayColor={'#00000033'} activeOpacity={1}>

                        <CancelTaskLabel>Cancel</CancelTaskLabel>

                    </CancelTaskButton>

                </TaskButtonsContainer>

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
    border-color:#000000

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
    margin-bottom:10px

`

const TaskDescInput = styled.TextInput`

    width:350px
    height:80px
    border-radius:10px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding:10px
    elevation:5
    margin-bottom:10px

`

const TaskDateContainer = styled.View`

    width:350px
    height:53px
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

const DaysOfWeekContainer = styled.View`

    width:100%
    height:35px
    display:flex
    flex-direction:row
    justify-content:space-between
    align-items:center
    margin-top:24px

`

const DayIconTouchable = styled.TouchableHighlight`

    width:35px
    height:35px
    border-radius:90px

`

const DayIcon = styled.View`

    width:100%
    height:100%
    background-color:#C4C4C4
    border-radius:90px
    display:flex
    align-items:center
    justify-content:center

`

const DayLabel = styled.Text`

    font-family:Barlow
    font-size:24px

`

const TimeContainer = styled.View`

    width:100%
    height:80px
    display:flex
    flex-direction:row
    margin-top:7px

`

const TaskTimeContainer = styled.View`

    width:47.5%
    height:100%

`

const TaskTimeWrapper = styled.View`

    width:100%
    height:53px
    display:flex
    flex-direction:row

`

const TimeInput = styled.TextInput`

    width:60%
    height:100%
    border-radius:10px
    background-color:#ffffff
    font-family:Barlow
    font-size:24px
    text-align:center

`

const ClockTouchable = styled.TouchableHighlight`

    width:53px
    height:53px
    display:flex
    align-items:center
    justify-content:center
    position:absolute
    right:0
    border-radius:90px

`

const TaskButtonsContainer = styled.View`

    width:100%
    height:53px
    margin-top:40px
    display:flex
    flex-direction:row
    justify-content:space-between

`

const SaveTaskButton = styled.TouchableHighlight`

    width:45%
    height:100%
    border-radius:10px
    background-color:#8A84FF
    display:flex
    justify-content:center
    align-items:center

`

const CancelTaskButton = styled.TouchableHighlight`

    width:45%
    height:100%
    border-radius:10px
    background-color:#ffffff
    display:flex
    justify-content:center
    align-items:center

`

const SaveTaskLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

const CancelTaskLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#8A84FF

`


export default EditTaskScreen;
 