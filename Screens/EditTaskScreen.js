
import React, {useState} from "react";
import { Vibration, Alert } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import * as firebaseAuth from '../firebaseConfig.js'

// Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Icons
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const EditTaskScreen = ({ navigation, route }) => {

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState()
    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    const [selectedDays, setSelectedDays] = useState([])
    const [refreshState, setRefreshing] = useState(false)
    const [selectedDaysString, setSelectedDaysString] = useState()

    const [selected, setSelected] = useState()
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(moment(new Date()).add(1, 'h').toDate())
    const [timeError, setTimeError] = useState(false)

    const [taskName, setTaskName] = useState("")
    const [taskNameError, setTaskNameError] = useState(false)

    const [taskDesc, setTaskDesc] = useState("")

    const [selectedColour, setSelectedColour] = useState("")

    const [overlapError, setOverlapError] = useState(false)

    const [isLoaded, setLoading] = useState(false)

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    if(isLoaded == false){

        if(route.params.type == "edit"){

            setTaskName(route.params.taskData['TaskName'])
            setTaskDesc(route.params.taskData['TaskDesc'])
            setStartTime(new Date(route.params.taskData['TimeStart']['seconds'] * 1000))
            setEndTime(new Date(route.params.taskData['TimeEnd']['seconds'] * 1000))
            setSelectedColour(route.params.taskData['SelectedColour'])

            try{

                setDate(new Date(route.params.taskData['Date']['seconds'] * 1000))

            }catch(err){

                setDate(new Date())

                setSelectedDays(route.params.taskData['Days'])

                var selectedDaysSub = ""

                for(let i = 0; i < route.params.taskData['Days'].length; i++){

                    if(i == route.params.taskData['Days'].length-1){

                        selectedDaysSub += route.params.taskData['Days'][i].substring(0,3)
    
                    }else{
    
                        selectedDaysSub += (route.params.taskData['Days'][i].substring(0,3) + ", ")
    
                    }

                }

                setSelectedDaysString(selectedDaysSub)

            }

        }else{

            const rndColour = Math.floor(Math.random() * (10 - 1 + 1) + 1)
            switch(rndColour){
                case 1:
                    setSelectedColour("#228B22")
                    break;
                case 2:
                    setSelectedColour("#FF0000")
                    break;
                case 3:
                    setSelectedColour("#FF1493")
                    break;
                case 4:
                    setSelectedColour("#A0522D")
                    break;
                case 5:
                    setSelectedColour("#FFFF00")
                    break;
                case 6:
                    setSelectedColour("#00BFFF")
                    break;
                case 7:
                    setSelectedColour("#808080")
                    break;
                case 8:
                    setSelectedColour("#FFA500")
                    break;
                case 9:
                    setSelectedColour("#8B008B")
                    break;
                case 10:
                    setSelectedColour("#000000")
                    break;
            }

        }        

        setLoading(true)

    }

    function onDateChange(event, selectedDate){

        const currentDate = selectedDate || date

        setShowDate(false)
        setDate(currentDate)
        setSelectedDays([])

    }

    function onTimeChange(event, selectedDate){

        const currentDate = selectedDate || date

        setShowTime(false)

        if(selected == "start"){

            setStartTime(currentDate)

        }else if(selected == "end"){

            setEndTime(currentDate)

        }

    }

    function goBack(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.pop()

    }

    function openDatePicker(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setSelected("date")
        setShowDate(true)

    }

    function openStartTime(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setTime(startTime)
        setSelected("start")
        setShowTime(true)

    }

    function openEndTime(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setTime(endTime)
        setSelected("end")
        setShowTime(true)

    }

    function setDay(day){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

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

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.pop()

    }

    async function saveTask(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        if(await checkInputsCorrect()){

            var formattedDate = date.setHours(0,0,0,0)

            var newDate = new Date(formattedDate)

            firebaseAuth.createTask(selectedColour, taskName, taskDesc, selectedDays, newDate, startTime, endTime)

            navigation.pop()

        }

    }

    async function updateTask(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        if(await checkInputsCorrect()){

            firebaseAuth.updateTask(selectedColour, taskName, taskDesc, selectedDays, date, startTime, endTime, route.params.taskData['docID'])

            navigation.pop()        

        }

    }

    function selectColour(colour){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setSelectedColour(colour)

    }

    async function checkInputsCorrect(){

        var inputsCorrect = true

        if(taskName == ""){

            inputsCorrect = false

            setTaskNameError(true)

        }else{

            setTaskNameError(false)

        }

        
        if(endTime < startTime){

            inputsCorrect = false

            setTimeError(true)

        }else{

            setTimeError(false)

        }

        await checkOverlappingTasks()
        .then(function(overlap){

            if(overlap == true){

                inputsCorrect = false

                setOverlapError(true)

            }else{

                setOverlapError(false)

            }

        })

        return inputsCorrect

    }

    async function checkOverlappingTasks(){

        const db = firebase.firestore()

        const TimetableCollection = db.collection("Timetable")

        const tasksData = []

        var overlapBool;

        var tasksOnDate;

        // DOW = Day of Week
        var tasksOnDOW;

        const formattedDate = new Date(date.setHours(0,0,0,0))

        if(selectedDays.length == 0){
            
            // All the "one off" tasks that happen on the "formattedDate"
            tasksOnDate = TimetableCollection.where("_UID","==", global.UID).where("Date","==", formattedDate)

            // All the repeating tasks that happen on the same day of the week that "formattedDate" is
            tasksOnDOW = TimetableCollection.where("_UID","==", global.UID).where("Days","array-contains", days[formattedDate.getDay()])


        }else{

            tasksOnDate = TimetableCollection.where("_UID","==", global.UID).where("DayOfWeek","in", selectedDays).where("Date",">=", formattedDate)

            // DOW = Day of Week
            tasksOnDOW = TimetableCollection.where("_UID","==", global.UID).where("Days","array-contains-any", selectedDays)

        }

        await tasksOnDate
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var task = doc.data()
                task.id = doc.id
                tasksData.push(task)

            })

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        await tasksOnDOW
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var task = doc.data()
                task.id = doc.id
                tasksData.push(task)

            })

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        for(let i=0; i<=tasksData.length-1; i++){

            const task2_start = new Date(tasksData[i]['TimeStart']['seconds'] * 1000)
            const task2_end = new Date(tasksData[i]['TimeEnd']['seconds'] * 1000)

            if(startTime < task2_start && task2_start < endTime){

                overlapBool = true

            }else if(startTime < task2_end && task2_end < endTime){

                overlapBool = true

            }else if(task2_start < startTime && endTime < task2_end){

                overlapBool = true

            }else{

                overlapBool = false

            }

        }

        return overlapBool

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <EditTaskBackground source={MainBackgroundImage}>

            <HeaderBar style={{backgroundColor:global.theme}}>

                <BackArrowTouchable onPress={()=>{goBack()}} underlayColor={"transparent"}>

                    <AntDesign name="arrowleft" size={40} color="#ffffff" />

                </BackArrowTouchable>

                {(route.params.type == "edit")?
                <HeaderLabel>Update Task</HeaderLabel>
                :
                <HeaderLabel>New Task</HeaderLabel>}

            </HeaderBar>

            <EditTaskBody>

                <EditTaskScroll>

                    <ColourSelectionHeader>Task Colour</ColourSelectionHeader>
                    <ColourButtonContainer>
                    
                        <SelectColourButton style={{backgroundColor:"#228B22", borderColor:"transparent", borderWidth:selectedColour!="#228B22"?5:0}} onPress={()=>{selectColour("#228B22")}}/>

                        <SelectColourButton style={{backgroundColor:"#FF0000", borderColor:"transparent", borderWidth:selectedColour!="#FF0000"?5:0}} onPress={()=>{selectColour("#FF0000")}}/>

                        <SelectColourButton style={{backgroundColor:"#FF1493", borderColor:"transparent", borderWidth:selectedColour!="#FF1493"?5:0}} onPress={()=>{selectColour("#FF1493")}}/>

                        <SelectColourButton style={{backgroundColor:"#A0522D", borderColor:"transparent", borderWidth:selectedColour!="#A0522D"?5:0}} onPress={()=>{selectColour("#A0522D")}}/>

                        <SelectColourButton style={{backgroundColor:"#FFFF00", borderColor:"transparent", borderWidth:selectedColour!="#FFFF00"?5:0}} onPress={()=>{selectColour("#FFFF00")}}/>

                        <SelectColourButton style={{backgroundColor:"#00BFFF", borderColor:"transparent", borderWidth:selectedColour!="#00BFFF"?5:0}} onPress={()=>{selectColour("#00BFFF")}}/>

                        <SelectColourButton style={{backgroundColor:"#808080", borderColor:"transparent", borderWidth:selectedColour!="#808080"?5:0}} onPress={()=>{selectColour("#808080")}}/>

                        <SelectColourButton style={{backgroundColor:"#FFA500", borderColor:"transparent", borderWidth:selectedColour!="#FFA500"?5:0}} onPress={()=>{selectColour("#FFA500")}}/>

                        <SelectColourButton style={{backgroundColor:"#8B008B", borderColor:"transparent", borderWidth:selectedColour!="#8B008B"?5:0}} onPress={()=>{selectColour("#8B008B")}}/>

                        <SelectColourButton style={{backgroundColor:"#000000", borderColor:"transparent", borderWidth:selectedColour!="#000000"?5:0}} onPress={()=>{selectColour("#000000")}}/>
                    
                    </ColourButtonContainer>

                    <TaskDataLabel>Task Name</TaskDataLabel>
                    <TaskNameInput
                    value={taskName}
                    placeholder="Required"
                    onChangeText={text => setTaskName(text)}/>

                    {(taskNameError == true)?
                    <ErrorContainer>

                        <ErrorLabel>Task Name is required.</ErrorLabel>

                    </ErrorContainer>:null}

                    <TaskDataLabel>Description</TaskDataLabel>
                    <TaskDescInput
                    multiline={true}
                    numberOfLines={4}
                    style={{textAlignVertical:'top'}}
                    value={taskDesc}
                    onChangeText={text => setTaskDesc(text)}/>

                    <TaskDataLabel>Task Date</TaskDataLabel>

                    <TaskDateContainer>

                        <TaskDateInput
                            editable={false}
                            value={selectedDays.length == 0 ? moment(date).format("DD/MM/YYYY"): selectedDaysString}/>

                        {(showDate == true)?
                        <DateTimePicker 
                            value={ date }
                            mode={'date'}
                            display='default'
                            onChange={onDateChange}
                        />:null}

                        <TaskDateTouchable onPress={()=>{openDatePicker()}} underlayColor={'#00000033'} activeOpacity={1}>

                            <Entypo name="calendar" size={45} color={global.theme} />

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

                                <ClockTouchable onPress={()=>{openStartTime()}}  underlayColor={global.underlay} activeOpacity={1}>

                                    <AntDesign name="clockcircle" size={40} color={global.theme} />

                                </ClockTouchable>

                            </TaskTimeWrapper>

                        </TaskTimeContainer>

                        <TaskTimeContainer style={{marginLeft:"5%"}}>

                            <TaskDataLabel>End Time</TaskDataLabel>
                            
                            <TaskTimeWrapper>

                                <TimeInput
                                    value={moment(endTime).format("HH:mm")}
                                    editable={false}/>

                                <ClockTouchable onPress={()=>{openEndTime()}}  underlayColor={global.underlay} activeOpacity={1}>

                                    <AntDesign name="clockcircle" size={40} color={global.theme} />

                                </ClockTouchable>

                            </TaskTimeWrapper>

                        </TaskTimeContainer>

                        {(showTime == true)?
                        <DateTimePicker 
                            value={ time }
                            mode={'time'}
                            display='default'
                            onChange={onTimeChange}
                        />:null}
                    
                    </TimeContainer>

                    {(timeError == true)?
                    <ErrorContainer>

                        <ErrorLabel>The Start time cannot be later than the End time.</ErrorLabel>

                    </ErrorContainer>:null}

                    {(overlapError == true)?
                    <ErrorContainer>

                        <ErrorLabel>You cannot make a task that overlaps with a preexisting task/s.</ErrorLabel>

                    </ErrorContainer>:null}

                    <TaskButtonsContainer>
                        
                        {(route.params.type == "edit")?
                        <SaveTaskButton onPress={()=>{updateTask()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

                            <SaveTaskLabel>UPDATE</SaveTaskLabel>

                        </SaveTaskButton>
                        :
                        <SaveTaskButton onPress={()=>{saveTask()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

                            <SaveTaskLabel>SAVE</SaveTaskLabel>

                        </SaveTaskButton>}

                        <CancelTaskButton onPress={()=>{cancelTask()}} underlayColor={'#CCCCCC'} activeOpacity={1}>

                            <CancelTaskLabel style={{color:global.theme}}>CANCEL</CancelTaskLabel>

                        </CancelTaskButton>

                    </TaskButtonsContainer>

                </EditTaskScroll>

            </EditTaskBody>

        </EditTaskBackground>

    </MainView>

    );
}

const MainView = styled.View`

    flex:1
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
    height:12.4%
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
    left:4%
    top:42%

`

const EditTaskBody = styled.View`

    width:85.07%
    height:85%
    margin-top:4%

`

const EditTaskScroll = styled.ScrollView`

    width:100%

`

const ColourSelectionHeader = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-bottom:1.6%

`

const ColourButtonContainer = styled.View`

    width:100%
    display:flex
    flex-wrap:wrap
    flex-direction:row
    justify-content:space-between

`

const SelectColourButton = styled.TouchableOpacity`

    width:60px
    height:60px
    border-radius:10px
    margin-bottom:10px

`

const TaskDataLabel = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-bottom:1.6%

`

const TaskNameInput = styled.TextInput`

    width:100%
    height:45px
    border-radius:10px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5
    margin-bottom:1.6%

`

const TaskDescInput = styled.TextInput`

    width:100%
    height:85px
    border-radius:10px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding:10px
    elevation:5
    margin-bottom:1.6%

`

const TaskDateContainer = styled.View`

    width:100%
    height:45px
    display:flex
    flex-direction:row

`

const TaskDateInput = styled.TextInput`

    width:82.86%
    height:100%
    border-radius:10px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5
    margin-bottom:1.6%

`

const TaskDateTouchable = styled.TouchableHighlight`

    width:15.14%
    height:100%
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
    height:70px
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
    height:100%
    display:flex
    flex-direction:row

`

const TimeInput = styled.TextInput`

    width:65%
    height:55%
    border-radius:10px
    background-color:#ffffff
    font-family:Barlow
    font-size:24px
    text-align:center

`

const ClockTouchable = styled.TouchableHighlight`

    width:40px
    height:40px
    display:flex
    align-items:center
    justify-content:center
    position:absolute
    right:4%
    border-radius:90px

`

const TaskButtonsContainer = styled.View`

    width:100%
    height:45px
    margin-top:5%
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
const ErrorContainer = styled.View`

    width:100%
    margin-bottom:1.6%

`

const ErrorLabel = styled.Text`

    font-family:Barlow
    color:#FF0000
    font-size:18px

`


export default EditTaskScreen;
