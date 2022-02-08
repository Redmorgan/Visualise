import React from "react";
import styled from "styled-components/native";


const TimeOfDayComponent = () => {

   return (

   <TimeOfDayBody>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>1am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>2am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>3am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>4am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>5am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>6am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>7am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>8am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>9am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>10am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>11am</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>12pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>1pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>2pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>3pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>4pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>5pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>6pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>7pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>8pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>9pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>10pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>11pm</TimeLabel>

       </SingleHourContainer>

       <SingleHourContainer>

            <TimeLabel>12am</TimeLabel>

       </SingleHourContainer>

   </TimeOfDayBody>

   );
}

const TimeOfDayBody = styled.View`

   height:100%
   width:100%

`

const SingleHourContainer = styled.View`

    width:100%
    height:70px
    display:flex
    align-items:center
    justify-content:center
    border-color:#000000    

`

const TimeLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px

`


export default TimeOfDayComponent;
