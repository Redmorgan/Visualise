/**
 * @fileoverview The component used for container that contains all 6 rows of the calendar used on CalendarComponent.js
*/

import React from "react";
import styled from "styled-components/native";

// Components
import CalendarGridRowComponent from "./CalendarGridRowComponent";

/**
 * @summary Component that displays the boxes making up the calendar
 * 
 * @param {Object List} dates - The dates occuring in the selected month
 * @param {Function}    navigation - Passed through navigation function for navigation between stacks. 
 * 
 * @returns 6 rows of 7 boxes which will contain either an X or an ordinal date.
 */
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
