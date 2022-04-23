/**
 * @fileoverview The component used for the "Tasks" tab where Adult users are able to create/manage their tasks.
 */

import React, {useState, useEffect} from "react";
import { Vibration } from "react-native";
import {useIsFocused} from '@react-navigation/native';
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Components
import TaskManagerItemComponent from "./TaskManagerItemComponent";
import LoadingComponent from "./LoadingComponent";

// Icons
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks.
 * 
 * @returns A page that displays the tasks a user has created, where they can create/update tasks, and filter and search tasks.
 */
const TaskManagerComponent = ({ navigation }) => {

    const[dropDownState, setDropdownState] = useState(false)
    const[dropDownSelection, setDropdownSelection] = useState("All Tasks")
    const[taskList, setTasks] = useState()
    const[searchString, setSearchString] = useState("")
    const[currentFilter, setCurrentFilter] = useState("All Tasks")
    const isFocused = useIsFocused();

    /**
     * @summary Loads a users tasks when they open the tab.
     */
    useEffect(()=>{
        (async () => {

            await getTasks()

        })()
    },[isFocused])

    /**
     * @summary Collects all the tasks belonging to a user from Firestore
     * 
     * @description When the tab loads all the tasks belonging to a user are collected from Firestore, these tasks
     * are then reformatted and added into a list along with their docID. These tasks are then loaded into the flatlist
     * on the page.
     */
    async function getTasks(){

        const db = firebase.firestore()

        const TimetableCollection = db.collection("Timetable")

        var filteredTasks = []

        var userTasks = []

        filteredTasks = TimetableCollection.where("_UID","==", global.UID)

        filteredTasks
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var task = doc.data()
                task.docID = doc.id

                userTasks.push(task)
                
            });

            setTasks(userTasks)

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

    /**
     * @summary Filters the tasks based on the whats entered in the search field
     * 
     * @param {String} searchString - The search the user has entered
     * @param {String} filter - The currently selected filter
     * 
     * @description This function runs whilst the user is searching for a task. As they type this function will run and the database will
     * be queried to find tasks that match the search made by the user. The currently set filter also gets applied to this.
     */
    async function searchTasks(searchString, filter){

        setSearchString(searchString)

        const db = firebase.firestore()

        const TimetableCollection = db.collection("Timetable")

        var collection = []

        var filteredTasks = []

        var userTasks = []

        if(filter == "All Tasks"){

            collection = TimetableCollection.where("_UID","==", global.UID)

        }else if(filter == "One Off"){


            collection = TimetableCollection.where("_UID","==", global.UID).where("Repeating","==",false)


        }else if(filter == "Repeating"){

            collection = TimetableCollection.where("_UID","==", global.UID).where("Repeating","==",true)

        }

        collection
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var task = doc.data()
                task.docID = doc.id
                filteredTasks.push(task)

            });

            userTasks = filteredTasks.filter(function (task){

                return task.TaskName.includes(searchString)

            })

            setTasks(userTasks)

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

    /**
     * @summary Clears the search bar
     * 
     * @description When the users starts typing the magnifying glass icon turns into an X, when the user presses the X the search
     * bar is cleared and the tasks are refiltered without a search.
     */
    function clearSearch(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setSearchString("")

        searchTasks("", dropDownSelection)

    }

    /**
     * @summary Opens the task editor page for the selected task.
     * 
     * @param {Object} taskData - Object containing data about a task
     * 
     * @description This function runs when the pencil "edit" button is pressed on a task in the flat list. When pressed it takes the taskData stored
     * on the component and passes it into this function where the EditTaskScreen the gets opened up which will be populated by taskData.
     */
    function openTaskEditor(taskData){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.push("EditTask",{type:"edit", taskData:taskData})

    }

    /**
     * @summary Opens the EditTaskScreen to let users create a new task
     * 
     * @description When the users pressed the "NEW TASK" button it will open a new stack of the EditTaskView which will be blank and let users
     * input information to create a new task.
     */
    function openNewTask(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.push("EditTask",{type:"new"})

    }

    /**
     * @summary Sets the current task filter based on the user selection.
     * 
     * @param {String} filter - The filter type the user has selected. 
     * 
     * @description On the dropdown when the user selects an option that option is passed into this function which will update the current filter
     * and re-filter the displayed tasks against this new filter.
     */
    function selectFilter(filter){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setDropdownSelection(filter)
        setDropdownState(false)
        setCurrentFilter(filter)
        searchTasks(searchString, filter)

    }

    /**
     * @summary Opens/Closes the Filter Dropdown
     * 
     * @description When the user selects the drop down it will either open/close based on its current state, the dropdown will also close when the
     * user selects an option from it.
     */
    function changeDropdownState(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        setDropdownState(!dropDownState)

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <TaskManagerBackground source={MainBackgroundImage}>

            <SearchBarContainer>

                <TaskSearchInput
                placeholder="Search"
                value={searchString}
                onChangeText={text => searchTasks(text, currentFilter)}/>

                {(searchString == "")?

                <SearchIconToucable underlayColor={'transparent'} activeOpacity={1}>

                    <Feather name="search" size={28} color="black" />

                </SearchIconToucable>
                :
                <SearchIconToucable onPress={()=>{clearSearch()}} underlayColor={'transparent'} activeOpacity={1}>
                    
                    <Feather name="x" size={34} color="black" />

                </SearchIconToucable>}

            </SearchBarContainer>

            <TaskListContainer>

                {(taskList == null)?
                <LoadingComponent message={"Loading"}/>
                :
                <TaskListScroll
                data = {taskList}
                keyExtractor={(item) => item.docID}
                nestedScrollEnabled
                renderItem={({ item }) => (<TaskManagerItemComponent taskData={item} openTaskEditor={openTaskEditor} refreshTasks={()=>{searchTasks(searchString, currentFilter)}}/>)}/>}

            </TaskListContainer>

            <ControlButtonContainer>

                <NewTaskButton onPress={()=>{openNewTask()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

                    <NewTaskLabel>NEW TASK</NewTaskLabel>

                </NewTaskButton>

            </ControlButtonContainer>

            <DropDownContainer>

                <DropDownHeaderTouchable onPress={()=>{changeDropdownState()}}>

                    <DropDownHeader>

                        <DropDownHeaderLabel>{dropDownSelection}</DropDownHeaderLabel>

                        <Ionicons name={(dropDownState)?"chevron-up-sharp":"chevron-down-sharp"} size={24} color="black"/>

                    </DropDownHeader>

                </DropDownHeaderTouchable>

                {(dropDownState == true)?
                <DropDownBody>

                    <DropDownOptionTouchable onPress={()=>{selectFilter("All Tasks")}} style={{borderTopWidth:1, borderTopColor:"#ECECEC"}}>

                        <DropDownOption>

                            <DropDownOptionLabel>All Tasks</DropDownOptionLabel>

                        </DropDownOption>

                    </DropDownOptionTouchable>

                    <DropDownOptionTouchable onPress={()=>{selectFilter("One Off")}}>

                        <DropDownOption>

                            <DropDownOptionLabel>One Off Tasks</DropDownOptionLabel>

                        </DropDownOption>

                    </DropDownOptionTouchable>

                    <DropDownOptionTouchable onPress={()=>{selectFilter("Repeating")}}>

                        <DropDownOption>

                            <DropDownOptionLabel>Repeating Tasks</DropDownOptionLabel>

                        </DropDownOption>

                    </DropDownOptionTouchable>

                </DropDownBody>:null}

            </DropDownContainer>

        </TaskManagerBackground>

    </MainView>

    );
}

const MainView = styled.View`

    flex:1;
    display: flex;
    align-items: center;
    justify-content:center;

`

const TaskManagerBackground = styled.ImageBackground`

    width:100%;
    height:100%;
    display: flex;
    align-items:center

`

const SearchBarContainer = styled.View`

    width:85%
    height:8%
    background-color:#ffffff
    border-radius:10px
    margin-top:40px
    elevation:5
    display:flex
    flex-direction:row

`

const TaskSearchInput = styled.TextInput`

    width:85%
    height:100%
    border-radius:10px
    font-family:Barlow
    font-size:24px
    padding-left:10px

`

const SearchIconToucable = styled.TouchableHighlight`

    width:15%
    height:100%
    display:flex
    align-items:center
    justify-content:center

`

const DropDownContainer = styled.View`

    width:36.46%
    elevation:6
    display:flex
    align-items:center
    margin-top:4%
    margin-left:48.61%
    position:absolute
    top:14%
    right:8%

`

const DropDownHeaderTouchable = styled.TouchableHighlight`

    width:100%
    height:40px
    border-radius:10px
    elevation:5

`

const DropDownHeader = styled.View`

    width:100%
    height:100%
    border-radius:10px
    background-color:#ffffff
    display:flex
    flex-direction:row
    align-items:center

`

const DropDownHeaderLabel = styled.Text`

    font-family:Barlow
    font-size:22px
    margin-left:18px
    width:68%

`

const DropDownBody = styled.View`

    width:90%
    height:95px
    background-color:#ffffff
    border-bottom-right-radius:5px
    border-bottom-left-radius:5px
    elevation:5

`

const DropDownOptionTouchable = styled.TouchableHighlight`

    width:100%
    height:30px

`

const DropDownOption = styled.View`

    width:100%
    height:100%
    background-color:#ffffff

`

const DropDownOptionLabel = styled.Text`

    font-family:Barlow
    font-size:22px
    margin-left:8px

`

const TaskListContainer = styled.View`

    width:85%
    height:60%
    margin-top:19%

`

const TaskListScroll = styled.FlatList`

    width:100%

`

const ControlButtonContainer = styled.View`

    width:85%
    height:8%
    margin-top:4%

`

const NewTaskButton = styled.TouchableHighlight`

    width:40%
    height:100%
    position:absolute
    right:0
    display:flex
    align-items:center
    justify-content:center
    border-radius:20px

`

const NewTaskLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

export default TaskManagerComponent;
