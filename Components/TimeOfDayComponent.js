/**
 * @fileoverview Component containing a full 24-hour clock for use on the "Today" tab.
 */

import React from "react";
import styled from "styled-components/native";

/**
 * @returns a flat list containing a full 24-hour clock in either 24-hour or 12-hour format based on the settings.
 */
const TimeOfDayComponent = () => {

    return (

    <TimeOfDayBody>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"00:00":"12am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"01:00":"1am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"02:00":"2am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"03:00":"3am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"04:00":"4am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"05:00":"5am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"06:00":"6am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"07:00":"7am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"08:00":"8am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"09:00":"9am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"10:00":"10am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"11:00":"11am"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"12:00":"12pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"13:00":"1pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"14:00":"2pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"15:00":"3pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"16:00":"4pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"17:00":"5pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"18:00":"6pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"19:00":"7pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"20:00":"8pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"21:00":"9pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer style={{borderBottomWidth:1}}>

            <TimeLabel>{(global.time == "24-hour")?"22:00":"10pm"}</TimeLabel>

        </SingleHourContainer>

        <SingleHourContainer>

            <TimeLabel>{(global.time == "24-hour")?"23:00":"11pm"}</TimeLabel>

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
