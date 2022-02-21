import React from "react";
import styled from "styled-components/native";

import CalendarGridRowComponent from "./CalendarGridRowComponent";


const CalendarGridComponent = ({ dates }) => {

   return (

   <CalendarGridContainer>

        <CalendarGridRowComponent dates={dates.slice(0, 7)}/>

        <CalendarGridRowComponent dates={dates.slice(7, 14)}/>

        <CalendarGridRowComponent dates={dates.slice(14, 21)}/>

        <CalendarGridRowComponent dates={dates.slice(21, 28)}/>

        <CalendarGridRowComponent dates={dates.slice(28, 35)}/>

        <CalendarGridRowComponent dates={dates.slice(35, 42)}/>

   </CalendarGridContainer>

   );
}

const CalendarGridContainer = styled.View`

   height:350px
   width:350px
   display:flex
   flex-wrap:wrap
   flex-direction:row

`

const CalendarDayContainer = styled.View`

    width:50px
    height:50px
    border-bottom-width:1px
    border-color:black
    justify-content:center
    align-items:center

`

const DateLabel = styled.Text`

    font-family:Barlow
    font-size:18px

`


export default CalendarGridComponent;
