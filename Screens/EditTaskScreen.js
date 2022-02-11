
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
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const [selectedDays, setSelectedDays] = useState([])
    const [refreshState, setRefreshing] = useState(false)
    const [selectedDaysString, setSelectedDaysString] = useState()

    const [selected, setSelected] = useState()
    const [startTime, setStartTime] = useState("00:00")
    const [endTime, setEndTime] = useState("00:00")


    function onDateChange(event, selectedDate){

        const currentDate = selectedDate || date

        if(selected == "start" || selected == "end"){

            var formattedTime = moment(selectedDate).format("HH:mm")

            if(selected == "start"){

                setStartTime(formattedTime)

            }else if(selected == "end"){

                setEndTime(formattedTime)

            }

        }else{

            //setSelectedDays([])
            setDate(currentDate)
            setShow(false)
            setSelectedDays([])

        }

        setShow(false)

    }

    function goBack(){

        Vibration.vibrate(5)
        navigation.pop()

    }

    function openDatePicker(){

        Vibration.vibrate(5)
        setMode("date")
        setSelected("date")
        setShow(true)

    }

    function openStartTime(){

        Vibration.vibrate(5)
        setMode("time")
        setSelected("start")
        setShow(true)

    }

    function openEndTime(){

        Vibration.vibrate(5)
        setMode("time")
        setSelected("end")
        setShow(true)

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

                    {(show == true)?
                    <DateTimePicker 
                        value={ date }
                        mode={mode}
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
                                value={startTime}/>

                            <ClockTouchable onPress={()=>{openStartTime()}}  underlayColor={'#00000033'} activeOpacity={1}>

                                <AntDesign name="clockcircle" size={50} color="#8A84FF" />

                            </ClockTouchable>

                        </TaskTimeWrapper>

                    </TaskTimeContainer>

                    <TaskTimeContainer style={{marginLeft:"5%"}}>

                        <TaskDataLabel>End Time</TaskDataLabel>
                        
                        <TaskTimeWrapper>

                            <TimeInput
                                value={endTime}
                                editable={false}/>

                            <ClockTouchable onPress={()=>{openEndTime()}}  underlayColor={'#00000033'} activeOpacity={1}>

                                <AntDesign name="clockcircle" size={50} color="#8A84FF" />

                            </ClockTouchable>

                        </TaskTimeWrapper>

                    </TaskTimeContainer>
                
                </TimeContainer>

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

export default EditTaskScreen;
 