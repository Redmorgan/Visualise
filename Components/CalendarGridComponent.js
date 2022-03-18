import React from "react";
import styled from "styled-components/native";

import CalendarGridRowComponent from "./CalendarGridRowComponent";


const CalendarGridComponent = ({ dates, navigation }) => {

   return (

   <CalendarGridContainer>

      <CalendarGridRowComponent dates={dates.slice(0, 7)} navigation={navigation}/>

      <CalendarGridRowComponent dates={dates.slice(7, 14)} navigation={navigation}/>

      <CalendarGridRowComponent dates={dates.slice(14, 21)} navigation={navigation}/>

      <CalendarGridRowComponent dates={dates.slice(21, 28)} navigation={navigation}/>

      <CalendarGridRowComponent dates={dates.slice(28, 35)} navigation={navigation}/>

      <CalendarGridRowComponent dates={dates.slice(35, 42)} navigation={navigation}/>

   </CalendarGridContainer>

   );
}

const CalendarGridContainer = styled.View`

   height:48.4%
   width:100%
   display:flex
   flex-wrap:wrap
   flex-direction:row

`


export default CalendarGridComponent;
