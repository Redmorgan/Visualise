
 import React from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import LoginBackgroundImage from '../Images/LoginBackground.png'
import BackArrowImage from '../Images/BackArrow.png' 

const CreateAccountScreen = ({ navigation }) => {

    function backToLogin(){

        Vibration.vibrate(5)
        navigation.pop()

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <LoginBackground source={LoginBackgroundImage}>

            <BackArrowTouchable onPress={()=>{backToLogin()}} underlayColor={"transparent"}>

                <BackArrow source={BackArrowImage}/>

            </BackArrowTouchable>

            <LoginHeader>Create an{"\n"}Account</LoginHeader>

            <LoginInput placeholder="Email"/>

            <LoginInput placeholder="Password"/>

            <LoginInput placeholder="Confirm Password"/>

            <SignUpButton underlayColor={'#6964c4'} activeOpacity={1} onPress={()=>{backToLogin()}}>

                <SignUpButtonLabel>SIGN UP</SignUpButtonLabel>

            </SignUpButton>

        </LoginBackground>

    </MainView>
 
    );
}
 
const MainView = styled.View`
 
    flex:1;
    display: flex;
    align-items: center;
    justify-content:center;
 
`
 
const LoginBackground = styled.ImageBackground`
 
    width:100%;
    height:100%;
    display: flex;
 
`

const BackArrowTouchable = styled.TouchableHighlight`

    width:33px
    height:24px
    margin-left:30px
    margin-top: 30px
    border-radius:90px

`

const BackArrow = styled.Image`

    width:100%
    height:100%

`

const LoginHeader = styled.Text`

    font-family:BarlowBold
    font-size:48px
    color:#000000
    margin-left:30px
    margin-top:59px
    width:300px
    height:130px

`

const LoginInput = styled.TextInput`

    width:350px
    height:53px
    border-radius:10px
    margin-left:30px
    margin-top:20px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5

`

const SignUpButton = styled.TouchableHighlight`

    width:151px
    height:53px
    border-radius:20px
    background-color: #8A84FF
    margin-top:31px
    margin-left:229px
    justify-content:center
    align-items:center

`

const SignUpButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

export default CreateAccountScreen;
 