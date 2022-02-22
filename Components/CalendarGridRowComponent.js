import React from "react";
import styled from "styled-components/native";


const CalendarGridRowComponent = ({ dates }) => {

   return (

   <CalendarGridRowContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>{dates[0]}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>{dates[1]}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>{dates[2]}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>{dates[3]}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>{dates[4]}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}}>

            <DateLabel>{dates[5]}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer>

            <DateLabel>{dates[6]}</DateLabel>

        </CalendarDayContainer>

   </CalendarGridRowContainer>

   );
}

const CalendarGridRowContainer = styled.View`

   height:${100/6}%
   width:100%
   display:flex
   flex-wrap:wrap
   flex-direction:row

`

const CalendarDayContainer = styled.View`

    width:${100/7}%
    height:100%
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
