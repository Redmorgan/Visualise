
import React from "react";
import { Vibration, Alert } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';

// Images
import LoginBackgroundImage from '../Images/LoginBackground.png'
import EmailIcon from '../Images/EmailIcon.png'
import PhoneIcon from '../Images/PhoneIcon.png'

// Icons
import { AntDesign } from '@expo/vector-icons';

const LoginHelpScreen = ({ navigation }) => {


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

            <LoginHeader>Help</LoginHeader>

            <LoginSubtext>Having issues with logging in?</LoginSubtext>

            <ContactContainer>

                <ContactTypeContainer>

                    <ContactImage source={EmailIcon}/>

                    <ContactHeaderLabel>Email</ContactHeaderLabel>

                    <ContactInfoLabel>admin@timetable.com</ContactInfoLabel>

                </ContactTypeContainer>

                <ContactTypeContainer>

                    <ContactImage source={PhoneIcon}/>

                    <ContactHeaderLabel>Telephone</ContactHeaderLabel>

                    <ContactInfoLabel>07598843305</ContactInfoLabel>

                </ContactTypeContainer>

            </ContactContainer>

        </LoginBackground>

    </MainView>

    );
}

const MainView = styled.View`

    flex:1
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

    width:9.7%
    height:6%
    margin-left:7.3%
    margin-top: 7.3%
    border-radius:90px
    align-items:center
    justify-content:center

`

const LoginHeader = styled.Text`

    font-family:BarlowBold
    font-size:48px
    color:#000000
    margin-left:7.3%
    margin-top:45%
    width:132px
    height:62px

`

const LoginSubtext = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-left:7.3%
    width:330px
    height:49px

`

const ContactContainer = styled.View`

    height:16.97%
    width:100%
    display:flex
    flex-direction:row
    justify-content:space-around
    margin-top:8.5%

`

const ContactTypeContainer = styled.View`

    width:43%
    height:100%
    display:flex
    align-items:center

`

const ContactImage = styled.Image`

    width:80px
    height:80px

`

const ContactHeaderLabel = styled.Text`

    font-family:Barlow
    font-size:24px

`

const ContactInfoLabel = styled.Text`

    font-family:Barlow
    font-size:15px
    margin-top:2%
    width:100%
    text-align:center

`

export default LoginHelpScreen;
