
import React, {useState, useEffect} from "react";
import { Vibration, Alert } from "react-native";
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
import DeleteTaskComponent from "./DeleteTaskComponent";
import LoadingComponent from "./LoadingComponent";

// Icons
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TaskManagerComponent = ({ navigation }) => {

    const[dropDownState, setDropdownState] = useState(false)
    const[dropDownSelection, setDropdownSelection] = useState("All Tasks")
    const[deleteTaskState, setDeleteTaskState] = useState(false)
    const[taskList, setTasks] = useState()
    const[searchString, setSearchString] = useState("")
    const[currentFilter, setCurrentFilter] = useState()
    const isFocused = useIsFocused();

    useEffect(()=>{
        (async () => {
    
            const tasks = await getTasks()
    
        })()
    },[isFocused])

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
                    // doc.data() is never undefined for query doc snapshots
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
                task.id = doc.id
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


    function openTaskEditor(taskData){

        Vibration.vibrate(5)
        navigation.push("EditTask",{type:"edit", taskData:taskData})

    }

    function openNewTask(){

        Vibration.vibrate(5)
        navigation.push("EditTask",{type:"new"})

    }

    function selectFilter(filter){

        setDropdownSelection(filter)
        setDropdownState(false)
        setCurrentFilter(filter)
        searchTasks(searchString, filter)

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <TaskManagerBackground source={MainBackgroundImage}>

            <SearchBarContainer>

                <TaskSearchInput placeholder="Search"
                onChangeText={text => searchTasks(text, currentFilter)}/>

                <SearchIconToucable>

                    <Feather name="search" size={28} color="black" />

                </SearchIconToucable>

            </SearchBarContainer>

            <DeleteTaskComponent state={deleteTaskState} closeDelete={()=>{setDeleteTaskState(false)}}/>

            <TaskListContainer>

                {(taskList == null)?
                <LoadingComponent message={"Loading"}/>
                :
                <TaskListScroll
                data = {taskList}
                keyExtractor={(item) => item.docID}
                nestedScrollEnabled
                renderItem={({ item }) => (<TaskManagerItemComponent taskData={item} openDelete={()=>{setDeleteTaskState(true)}} openTaskEditor={openTaskEditor}/>)}
                contentContainerStyle={{paddingBottom:10}}/>}

            </TaskListContainer>

            <ControlButtonContainer>

                <NewTaskButton onPress={()=>{openNewTask()}} underlayColor={'#6964c4'} activeOpacity={1}>

                    <NewTaskLabel>NEW TASK</NewTaskLabel>

                </NewTaskButton>

            </ControlButtonContainer>

            <DropDownContainer>

                <DropDownHeaderTouchable onPress={()=>{setDropdownState(!dropDownState)}}>

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

                            <DropDownOptionLabel>One Off</DropDownOptionLabel>

                        </DropDownOption>

                    </DropDownOptionTouchable>

                    <DropDownOptionTouchable onPress={()=>{selectFilter("Repeating")}}>

                        <DropDownOption>

                            <DropDownOptionLabel>Repeating</DropDownOptionLabel>

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
    background-color: #8A84FF
    border-radius:20px

`

const NewTaskLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`


export default TaskManagerComponent;
 