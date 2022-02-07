import React from "react";
import styled from "styled-components/native";


const CalendarGridRowComponent = ({ month }) => {

   return (

   <CalendarGridRowContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>1st</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>1st</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>1st</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>1st</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>1st</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>1st</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer>

            <DateLabel>1st</DateLabel>

        </CalendarDayContainer>

   </CalendarGridRowContainer>

   );
}

const CalendarGridRowContainer = styled.View`

   height:50px
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


export default CalendarGridRowComponent;
