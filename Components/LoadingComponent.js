/**
 * @fileoverview A component with a loading wheel that is used whilst something is loading.
 */

import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

/**
 * @summary Loading wheel used when something in the application is being loaded
 * 
 * @returns A component containing loading text and a loading wheel
 */
const LoadingComponent = ({ message }) => {

return (

    <LoadingContainer>

        <ActivityIndicator style={{width:50, height:50}} color="#8A84FF" size="large"/>

        <LoadingLabel>{message}...</LoadingLabel>

    </LoadingContainer>

);
}

const LoadingContainer = styled.View`

    width:100%;
    display:flex;
    align-items:center;

`

const LoadingLabel = styled.Text`

    width:100%;
    font-family:BarlowSemi;
    text-align:center;
    font-size:30px;

`

export default LoadingComponent;