/**
 * @fileoverview A component that contains the flat list that loads all of the tasks on the "Today" tab.
 */

import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import { LogBox } from 'react-native';
import moment from 'moment';

// Components
import TaskComponent from "./TaskComponent";

/**
 * @param {Object List} tasks - All the tasks occuring on either the current day or a selected day.
 *  
 * @returns A flat list containing all the tasks occuring on a specific day that line up with the correct time of day based on each of
 * the tasks start and end time.
 */
const TimeTableTasksComponent = ({ tasks }) => {

   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

   const [formattedTasks, setFormattedTasks] = useState([])
   
   /**
    * @summary Loads the tasks when the tab is opened.
    */
   useEffect(()=>{
      (async () => {

         formatTasks()

      })()
   },[tasks])

   /**
    * @summary Collects all the tasks occuring on a specified days and formats them for use in the flat list.
    * 
    * @description The function takes the list of tasks and reformats it into a new list.
    * In this new list new object are added between and around the tasks to take up the empty space between tasks, this is done
    * by comparing the difference between the end time of one task and the start time of another. This time difference is calculated into
    * pixels which then gets applied back to the entity. This pixel amount is used to determine the length of the tasks (TaskComponent).
    */
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

         setFormattedTasks(formattedTasks)

      }

   }

   /**
    * @summary Calculates the lenght of time between the start of the day and the first task.
    * 
    * @param {DateTime} date - The start time of the first task of the day.
    * 
    * @description TO start the list the time difference between the beginning of the day and the first task must be calculated,
    * this is used to make the first spacer task of the day so that the first task of the day starts at the right time on the scrollable view.
    * 
    * @returns Returns a pixel amount for the length of time between the beginning of the day and the start of the first task.
    */
   function convertTimeToHeight(date){

      const timeString = moment(date).format("HH:mm:ss")

      const timeSplit = timeString.split(":")

      const seconds = (+timeSplit[0]) * 60 * 60 + (+timeSplit[1]) * 60 + (+timeSplit[2])

      const secondsInDay = 86400

      return ((1703/secondsInDay)*seconds)-11

      

   }

   /**
    * @summary Returns the pixel length of a task
    * 
    * @param {DateTime} startTime 
    * @param {DateTime} endTime 
    * 
    * @description Takes the start and end time of a task and converts the length of time of the task in seconds into pixels.
    * 
    * @returns Returns a value for the lenght of time of a task in a pixel amount.
    */
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
