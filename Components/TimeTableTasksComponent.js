import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import { LogBox } from 'react-native';
import moment from 'moment';

// Components
import TaskComponent from "./TaskComponent";

const TimeTableTasksComponent = ({ tasks }) => {

   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

   const [formattedTasks, setFormattedTasks] = useState([])

   useEffect(()=>{
      (async () => {

         formatTasks()

      })()
   },[tasks])

   function formatTasks(){

      var formattedTasks = []

      var emptyTime;

      var task;

      if(tasks != null){

         for(let i = 0; i < tasks.length; i++){

            if(i == 0){

               var startTime = tasks[0]['TimeStart']['seconds'] * 1000

               const newDate = new Date(startTime)

               emptyTime = {length:convertTimeToHeight(newDate), colour:"", name:"", type:"", docID:tasks[0]['id']+"1"}

               formattedTasks.push(emptyTime)

               task = { length:calculateTaskLength(tasks[0]['TimeStart']['seconds'] * 1000, tasks[0]['TimeEnd']['seconds'] * 1000),
                        colour:tasks[0]['SelectedColour'],
                        name:tasks[0]['TaskName'],
                        start:tasks[0]['TimeStart']['seconds'] * 1000,
                        end:tasks[0]['TimeEnd']['seconds'] * 1000,
                        desc:tasks[0]['TaskDesc'],
                        type:"",
                        docID:tasks[0]['id']
                     }

               formattedTasks.push(task)

            }else{

               const currentTask = tasks[i]
               const previousTask = tasks[i-1]

               emptyTime = {  length:calculateTaskLength(previousTask['TimeEnd']['seconds'] * 1000, currentTask['TimeStart']['seconds'] * 1000),
                              colour:"",
                              name:"",
                              start:"",
                              end:"",
                              desc:"",
                              type:"",
                              docID:currentTask['id']+"1"
                           }

               formattedTasks.push(emptyTime)

               task = { length:calculateTaskLength(currentTask['TimeStart']['seconds'] * 1000, currentTask['TimeEnd']['seconds'] * 1000),
                        colour:currentTask['SelectedColour'],
                        name:currentTask['TaskName'],
                        start:currentTask['TimeStart']['seconds'] * 1000,
                        end:currentTask['TimeEnd']['seconds'] * 1000,
                        desc:currentTask['TaskDesc'],
                        type:"",
                        docID:currentTask['id']
                     }

               formattedTasks.push(task)

            }

         }

         console.log(formattedTasks)

         setFormattedTasks(formattedTasks)

      }

   }

   function convertTimeToHeight(date){

      const timeString = moment(date).format("HH:mm:ss")

      const timeSplit = timeString.split(":")

      const seconds = (+timeSplit[0]) * 60 * 60 + (+timeSplit[1]) * 60 + (+timeSplit[2])

      const secondsInDay = 86400

      return ((1703/secondsInDay)*seconds)-11

      

   }

   function calculateTaskLength(startTime, endTime){

      var startLength = convertTimeToHeight(startTime)

      var endLength = convertTimeToHeight(endTime)

      return endLength - startLength

   }


   return (

      <TTT_Body
         scrollEnabled={false}
         data = {formattedTasks}
         keyExtractor={(item) => item.docID}
         nestedScrollEnabled
         renderItem={({ item }) => (<TaskComponent task={item} />)}
      />

   );
}

const TTT_Body = styled.FlatList`

   width:100%
   height:100%
   display: flex;
   border-bottom-right-radius:10px

`

export default TimeTableTasksComponent;
