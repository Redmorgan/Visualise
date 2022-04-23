/**
 * @fileoverview The component for the page where users are able to create/update tasks.
 */

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

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 * @param {Function} route - Pass through data from the previous layer of the stack.
 *  
 * @returns 
 */
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

    const [selectedColour, setSelectedColour] = useState("")
    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")

    const [taskNameError, setTaskNameError] = useState(false)
    const [timeError, setTimeError] = useState(false)
    const [overlapError, setOverlapError] = useState(false)
    const [existingError, setExistingError] = useState(false)

    const [isLoaded, setLoading] = useState(false)

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    if(isLoaded == false){

        // If its a task edit it will populate all the fields automatically
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

        // If its a new task it will randomly select a colour for the task
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

    /**
     * @summary Updates the set date when the date picker is used.
     * 
     * @param {Function} event - Left over from datepicker library, needs to be there but doesnt do anything 
     * @param {DateTime} selectedDate - The date the user has selected from the date picker
     * 
     * @description When the user opens the date picker, selects a date, then presses confirm, this function runs
     * which takes the selected date and updates the date use state to it.
     */
    function onDateChange(event, selectedDate){

        const currentDate = selectedDate || date

        setShowDate(false)
        setDate(currentDate)
        setSelectedDays([])

    }

    /**
     * @summary Updates the set start or end time when the time picker is used.
     * 
     * @param {Function} event - Left over from datepicker library, needs to be there but doesnt do anything 
     * @param {DateTime} selectedDate - Also uses a datetime object, but only the time part of it gets used.
     * 
     * @description  When the user selectgs the time picker for either the start or end time, then presses confirm, this function
     * runs which takes the selected time and updates either the start or end time based on which one was selected.
     */
    function onTimeChange(event, selectedDate){

        const currentDate = selectedDate || date

        setShowTime(false)

        if(selected == "start"){

            setStartTime(currentDate)

        }else if(selected == "end"){

            setEndTime(currentDate)

        }

    }

    /**
     * @summary Takes the user back to the task manager page.
     * 
     * @description When the user presses the back button, this function runs which then pops the top layer of the stack,
     * taking the user back to the task manager page.
     */
    function goBack(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.pop()

    }

    /**
     * @summary Opens the datepicker pop-up
     * 
     * @description When the user presses the date picker button it changes the visibility of the datepicker to true
     * and displays it to the user. The datepicker displayed is the one inbuilt into the phones OS.
     */
    function openDatePicker(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setSelected("date")
        setShowDate(true)

    }

    /**
     * @summary Opens the start time timepicker pop-up
     * 
     * @description When the user presses the start time timepicker button it changes the visibility of the timepicker to true
     * and displays it to the user. The timepicker displayed is the one inbuilt into the phones OS.
     */
    function openStartTime(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setTime(startTime)
        setSelected("start")
        setShowTime(true)

    }

    /**
     * @summary Opens the end time timepicker pop-up.
     * 
     * @description When the user presses the end time timepicker button it changes the visibility of the timepicker to true
     * and displays it to the user. The timepicker displayed is the one inbuilt into the phones OS.
     */
    function openEndTime(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setTime(endTime)
        setSelected("end")
        setShowTime(true)

    }

    /**
     * @summary Adds the selected day to the list of repeating days.
     * 
     * @param {String} day - Day of week to add.
     * 
     * @description When the user selects on a day of the week to set it as a repeating day it gets added to a list which is
     * displayed to the user. If the day is already selected then the day is removed from the list. If every day is selected then
     * "Every day" will be displayed to the user.
     */
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

    /**
     * @summary Cancels the task and takes the user back to the task manager page.
     * 
     * @description When the user presses the cancel button it takes the user back to the task manager page,
     * this works the same as the back button, its just another option for the user.
     */
    function cancelTask(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.pop()

    }

    /**
     * @summary Checks the inputs and saves the new task to firestore
     * 
     * @summary When the user presses SAVE the inputs the user has made will be checked to make sure they are all valid,
     * if they are all valid then the task will be added into Firestore.
     */
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

    /**
     * @summary Checks the inputs and updates the existing task to firestore
     * 
     * @summary When the user presses UPDATE the inputs the user has made will be checked to make sure they are all valid,
     * if they are all valid then the existing task on Firestore will be updated.
     */
    async function updateTask(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        if(await checkInputsCorrect()){

            firebaseAuth.updateTask(selectedColour, taskName, taskDesc, selectedDays, date, startTime, endTime, route.params.taskData['docID'])

            navigation.pop()        

        }

    }

    /**
     * @summary Sets the task colour to whatever colour the user has selected
     * 
     * @param {String} colour - The task colour the user has selected
     * 
     * @description When one of the 10 colour options is selected this function runs which will save the selection made
     * by the user.
     */
    function selectColour(colour){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setSelectedColour(colour)

    }

    /**
     * @summary Checks the inputs to see if there are any errors.
     * 
     * @description 4 input checks are made within the function:
     * - If there is a name in the Task Name input box.
     * - If the name in the Task Name input box is unique and the user doesnt already have a task with that name.
     * - If the task start time is before the task end time.
     * - If this task would overlap with a pre-existing task the user has created.
     * If all these checks pass then a true value will be returned.
     * 
     * @returns A boolean thats true if there are no error and false if there are errors.
     */
    async function checkInputsCorrect(){

        var inputsCorrect = true

        if(taskName == ""){

            inputsCorrect = false

            setTaskNameError(true)

        }else{

            setTaskNameError(false)

            await checkExistingName()
            .then(function(existing){
    
                if(existing){
    
                    inputsCorrect = false

                    setExistingError(true)
    
                }else{
    
                    setExistingError(false)
    
                }
    
            })

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

    /**
     * @summary Checks to see if the task being made/updated would overlap with a pre-existing task.
     * 
     * @description This function compares the task being created against all the other tasks a user has already created, both
     * one-off and repeating. It checks to see if there is any overlap in times. If there is an overlap it will return a true value.
     * The overlap does however filter out one-off tasks that have already happened.
     * 
     * @returns A boolean that is true if there is an overlap and false if there isnt.
     */
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

                if(task['TaskName'] != taskName){
                    tasksData.push(task)
                }

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

                if(task['TaskName'] != taskName){
                    tasksData.push(task)
                }

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

    /**
     * @summary Checks to see if a task with that name already exists.
     * 
     * @description The function checks to see if the user has already created a task with the name they are trying to use.
     * This is only on a user by user basis, two different users are able to have tasks with the same name.
     * 
     * @returns A boolean that is true if the name already exists and false if it doesnt
     */
    async function checkExistingName(){

        const db = firebase.firestore()

        const TimetableCollection = db.collection("Timetable")

        const tasksOnDate = TimetableCollection.where("_UID","==", global.UID)

        var existingName = false

        await tasksOnDate
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var task = doc.data()

                if(route.params.type == "edit"){

                    if(route.params.taskData['TaskName'] != taskName){

                        existingName = true

                    }

                }else{

                    if(task['TaskName'] == taskName){

                        existingName = true

                    }

                }

            })

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });      
        
        if(existingName){

            return true

        }else{

            return false

        }

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

                    {(existingError == true)?
                    <ErrorContainer>

                        <ErrorLabel>You already have a task with this name, please select another one.</ErrorLabel>

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
