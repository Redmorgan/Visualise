
 import React from "react";
 import { Vibration, Alert, Dimensions } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';
 
 // Images
import LoginBackgroundImage from '../Images/LoginBackground.png'

const LoginScreen = ({ navigation }) => {
    
    const showMessage = (input) => {

        Alert.alert(`Button Pressed: ${input}`);

    }

    function openCreateAccount(){

        Vibration.vibrate(5)
        navigation.push("CreateAccount")

    }

    function openForgotPassword(){

        Vibration.vibrate(5)
        navigation.push("ForgotPassword")

    }

    function openContactUs(){

        Vibration.vibrate(5)
        navigation.push("LoginHelp")

    }

    function openViewPick(){

        Vibration.vibrate(5)
        navigation.push("ViewPick")

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <LoginBackground source={LoginBackgroundImage}>

            <LoginHeader>Login</LoginHeader>

            <LoginSubtext>Sign in to continue.</LoginSubtext>

            <LoginInput placeholder="Email"/>

            <LoginInput placeholder="Password" secureTextEntry={true}/>

            <ForgottenPasswordLabel onPress={()=>{openForgotPassword()}}>Forgotten Password</ForgottenPasswordLabel>

            <LoginButton underlayColor={'#6964c4'} activeOpacity={1} onPress={()=>{openViewPick()}}>

                <LoginButtonLabel>LOGIN</LoginButtonLabel>

            </LoginButton>

            <AccountSignUpContainer>

                <SignUpSubtext>Don't have an account?</SignUpSubtext>

                <SignUpLabel onPress={()=>{openCreateAccount()}}>Sign up</SignUpLabel>

            </AccountSignUpContainer>

            <ContactUsContainer>

                <ContactUsLabel onPress={()=>{openContactUs()}}>Contact Us</ContactUsLabel>

            </ContactUsContainer>

        </LoginBackground>

    </MainView>
 
    );
}
 
const MainView = styled.View`
 
    flex:1
    align-items: center;
    justify-content:center;
 
`
 
const LoginBackground = styled.ImageBackground`
 
    width:100%;
    height:100%;
    display: flex;
 
`

const LoginHeader = styled.Text`

    font-family:BarlowBold
    font-size:48px
    color:#000000
    margin-left:7.5%
    margin-top:40%
    width:132px
    height:62px

`

const LoginSubtext = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-left:30px
    width:213px
    height:49px

`

const LoginInput = styled.TextInput`

    width:85%
    height:6.4%
    border-radius:10px
    margin-left:7.5%
    margin-top:5%
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5

`

const ForgottenPasswordLabel = styled.Text`

    width:165px
    height:25px
    font-family:BarlowSemi
    font-size:18px
    color:#8A84FF
    margin-top:0.6%
    margin-left:53.5%

`

const LoginButton = styled.TouchableHighlight`

    width:36.7%
    height:6.4%
    border-radius:20px
    background-color: #8A84FF
    margin-top:4%
    margin-left:55.66%
    justify-content:center
    align-items:center

`

const LoginButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

const AccountSignUpContainer = styled.View`

    width:85%
    height:3%
    margin-top:5.4%
    margin-left:7.3%
    display:flex
    flex-direction:row
    justify-content:center

`

const SignUpSubtext = styled.Text`

    font-family:BarlowSemi
    font-size:18px
    color:#000000

`

const SignUpLabel = styled.Text`

    font-family:BarlowSemi
    font-size:18px
    color:#8A84FF
    margin-left:2.4%

`

const ContactUsContainer = styled.View`

    width:100%
    height:3.6%
    display:flex
    flex-direction:row
    justify-content:center
    margin-top:10px
    
`

const ContactUsLabel = styled.Text`

    font-family:BarlowSemi
    font-size:18px
    color:#8A84FF
    text-decoration:underline

`




export default LoginScreen;
 