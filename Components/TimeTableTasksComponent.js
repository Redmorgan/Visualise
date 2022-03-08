import React, {useState, useEffect} from "react";
import styled from "styled-components/native";
import { LogBox } from 'react-native';
import moment from 'moment';

// Components
import TaskComponent from "./TaskComponent";



const TimeTableTasksComponent = ({ openTaskOverView, tasks }) => {

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

      for(let i = 0; i < tasks.length; i++){

         if(i == 0){

            var startTime = tasks[0]['TimeStart']['seconds'] * 1000

            const newDate = new Date(startTime)

            emptyTime = {length:convertTimeToHeight(newDate), colour:"", name:"", type:""}

            console.log(emptyTime)

            formattedTasks.push(emptyTime)

         }else{

            

         }

      }

      setFormattedTasks(formattedTasks)

   }

   function convertTimeToHeight(date){

      const timeString = moment(date).format("HH:mm:ss")

      console.log(timeString)

      const timeSplit = timeString.split(":")

      const seconds = (+timeSplit[0]) * 60 * 60 + (+timeSplit[1]) * 60 + (+timeSplit[2])

      const secondsInDay = 86400

      return (1680/secondsInDay)*seconds

   }


   return (

   // <TTT_Body>

   //    <TaskComponent length={700}/>

   //    <TaskComponent length={140} colour={"#EA4458"} name={"School Starts"} type="school" openTaskOverView={openTaskOverView}/>

   //    <TaskComponent length={140} colour={"#64E84E"} name={"Biology Class"} type="bug-sharp" openTaskOverView={openTaskOverView}/>

   //    <TaskComponent length={70}/>

   //    <TaskComponent length={0} colour={"#E8E14E"} name={"School Ends"} type="school" openTaskOverView={openTaskOverView}/>

   // </TTT_Body>

      <TTT_Body
         data = {formattedTasks}
         keyExtractor={(item) => item.docID}
         nestedScrollEnabled
         renderItem={({ item }) => (<TaskComponent length={item['length']} colour={item['colour']} name={item['name']} type={item['type']} openTaskOverView={openTaskOverView}/>)}
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
