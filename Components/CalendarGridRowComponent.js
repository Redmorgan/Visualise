import React from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";
import moment from 'moment';

const CalendarGridRowComponent = ({ dates, navigation }) => {

    function openTasks(date){

        if(date != "X"){

            if(global.vibe != 0){

                Vibration.vibrate(5)

            }

            var newDate = new Date(date)

            navigation.push("Today", {date:newDate})

        }

    }

    return (

    <CalendarGridRowContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[0]['date'])}}>

            <DateLabel>{(dates[0]['date'] != "X")?moment(dates[0]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[1]['date'])}}>

            <DateLabel>{(dates[1]['date'] != "X")?moment(dates[1]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[2]['date'])}}>

            <DateLabel>{(dates[2]['date'] != "X")?moment(dates[2]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[3]['date'])}}>

            <DateLabel>{(dates[3]['date'] != "X")?moment(dates[3]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[4]['date'])}}>

            <DateLabel>{(dates[4]['date'] != "X")?moment(dates[4]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[5]['date'])}}>

            <DateLabel>{(dates[5]['date'] != "X")?moment(dates[5]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[6]['date'])}}>

            <DateLabel>{(dates[6]['date'] != "X")?moment(dates[6]['date']).format("Do"):"X"}</DateLabel>

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

const CalendarDayContainer = styled.TouchableHighlight`

    width:${(100/7)-0.001}%
    height:100%
    border-bottom-width:1px
    border-color:black
    justify-content:center
    align-items:center

`

const DateLabel = styled.Text`

    width:100%
    text-align:center
    font-family:Barlow
    font-size:18px

`

export default CalendarGridRowComponent;
