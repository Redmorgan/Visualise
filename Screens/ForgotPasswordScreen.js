
 import React from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import LoginBackgroundImage from '../Images/LoginBackground.png'

// Icons
import { AntDesign } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
  
    function backToLogin(){

        Vibration.vibrate(5)
        navigation.pop()
    
    }


    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <LoginBackground source={LoginBackgroundImage}>

            <BackArrowTouchable onPress={()=>{backToLogin()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color="#8A84FF" />

            </BackArrowTouchable>

            <LoginHeader>Forgotten{"\n"}Password</LoginHeader>

            <LoginSubtext>Enter email of existing account.</LoginSubtext>

            <LoginInput placeholder="Email"/>

            <LoginButton underlayColor={'#6964c4'} activeOpacity={1} onPress={()=>{backToLogin()}}>

                <LoginButtonLabel>RESET</LoginButtonLabel>

            </LoginButton>

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

    width:40px
    height:40px
    margin-left:30px
    margin-top: 30px
    border-radius:90px
    align-items:center
    justify-content:center

`

const LoginHeader = styled.Text`

    font-family:BarlowBold
    font-size:48px
    color:#000000
    margin-left:30px
    margin-top:106px
    width:220px
    height:120px

`

const LoginSubtext = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-left:30px
    width:330px
    height:49px

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

const ForgottenPasswordLabel = styled.Text`

    width:159px
    height:25px
    font-family:Barlow
    font-size:18px
    color:#8A84FF
    margin-top:5px
    margin-left:222px

`

const LoginButton = styled.TouchableHighlight`

    width:151px
    height:53px
    border-radius:20px
    background-color: #8A84FF
    margin-top:17px
    margin-left:229px
    justify-content:center
    align-items:center

`

const LoginButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

export default ForgotPasswordScreen;
 