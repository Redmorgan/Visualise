/**
 * @fileoverview The component used for displaying a single week on the calendar
*/

import React from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";
import moment from 'moment';

/**
 * 
 * @param {Object List} dates - Contains 7 "days" of data for each box on the row (42 days split across 6 rows)
 * @param {Function}    navigation - Passed through navigation function for navigation between stacks. 
 * 
 * @returns 
 */
const CalendarGridRowComponent = ({ dates, navigation }) => {

    /**
     * @summary Opens the timetable for the selected day
     * 
     * @param {DateTime} date - The date the user has selected
     * 
     * @description Based on which date the user has selected it will open up a version of the "Today" tab that will show
     * the tasks occuring on that given date (Rather than the current day). This will open up as a stack instead of a tab.
     */
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

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={dates[0]['date'] == "X"?'transparent':'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[0]['date'])}}>

            <DateLabel>{(dates[0]['date'] != "X")?moment(dates[0]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={dates[1]['date'] == "X"?'transparent':'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[1]['date'])}}>

            <DateLabel>{(dates[1]['date'] != "X")?moment(dates[1]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={dates[2]['date'] == "X"?'transparent':'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[2]['date'])}}>

            <DateLabel>{(dates[2]['date'] != "X")?moment(dates[2]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={dates[3]['date'] == "X"?'transparent':'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[3]['date'])}}>

            <DateLabel>{(dates[3]['date'] != "X")?moment(dates[3]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={dates[4]['date'] == "X"?'transparent':'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[4]['date'])}}>

            <DateLabel>{(dates[4]['date'] != "X")?moment(dates[4]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer style={{borderRightWidth:1}} underlayColor={dates[5]['date'] == "X"?'transparent':'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[5]['date'])}}>

            <DateLabel>{(dates[5]['date'] != "X")?moment(dates[5]['date']).format("Do"):"X"}</DateLabel>

        </CalendarDayContainer>

        <CalendarDayContainer underlayColor={dates[6]['date'] == "X"?'transparent':'#00000033'} activeOpacity={1} onPress={()=>{openTasks(dates[6]['date'])}}>

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
