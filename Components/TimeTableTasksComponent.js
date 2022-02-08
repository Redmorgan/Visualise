import React from "react";
import styled from "styled-components/native";

// Components
import TaskComponent from "./TaskComponent";


const TimeTableTasksComponent = ({  }) => {

   return (

   <TTT_Body>

        <TaskComponent length={700}/>

        <TaskComponent length={140} colour={"#EA4458"} name={"School Starts"} type="school"/>

        <TaskComponent length={140} colour={"#64E84E"} name={"Biology Class"} type="bug-sharp"/>

        <TaskComponent length={70}/>

        <TaskComponent length={0} colour={"#E8E14E"} name={"School Ends"} type="school"/>

   </TTT_Body>

   );
}

const TTT_Body = styled.View`

   width:100%
   height:100%
   display: flex;
   border-bottom-right-radius:10px


`


export default TimeTableTasksComponent;
