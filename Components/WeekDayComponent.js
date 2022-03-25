import React from "react";
import styled from "styled-components/native";

const WeekDayComponent = ({ day }) => {

    return (

    <DayBody style={{borderRightWidth: day=="Sun"?0:1}}>

        <DayLabel>{day}</DayLabel>

    </DayBody>

    );
}

const DayBody = styled.View`

    height:100%
    width:${100/7}%
    display: flex;
    align-items: center;
    justify-content:center;
    border-color:#000000

`

const DayLabel = styled.Text`

    font-family:BarlowSemi
    font-size:18px

`

export default WeekDayComponent;
