
 import React from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import LoginBackgroundImage from '../Images/LoginBackground.png'
import BackArrowImage from '../Images/BackArrow.png' 
import EmailIcon from '../Images/EmailIcon.png'
import PhoneIcon from '../Images/PhoneIcon.png'

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

                <BackArrow source={BackArrowImage}/>

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
    margin-top:185px
    width:132px
    height:62px

`

const LoginSubtext = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-left:30px
    width:330px
    height:49px

`

const ContactContainer = styled.View`

    height:141px
    width:100%
    display:flex
    flex-direction:row
    justify-content:space-around
    margin-top:36px

`

const ContactTypeContainer = styled.View`

    width:162px
    height:141px
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
    margin-top:5px

`

export default LoginHelpScreen;
 