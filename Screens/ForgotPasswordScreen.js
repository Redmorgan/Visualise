/**
 * @fileoverview The component for the page that lets users reset their password.
 */

import React, { useState } from "react";
import { Vibration, Alert } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import * as firebaseAuth from '../firebaseConfig.js'

// Images
import ResetBackgroundImage from '../Images/LoginBackground.png'

// Icons
import { AntDesign } from '@expo/vector-icons';

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 * 
 * @returns 
 */
const ForgotPasswordScreen = ({ navigation }) => {

    const[email, setEmail] = useState("")
    const [isError, setError] = useState(false)
    const [isReset, setReset] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")

    /**
     * @summary Takes the user back to the login page
     * 
     * @description When the user presses the back arrow this function runs and it takes
     * the user back to the login screen.
     */
    function backToLogin(){

        Vibration.vibrate(5)
        navigation.pop()

    }

    /**
     * @summary Takes the inputted email and sends a password reset link to it.
     * 
     * @description The function takes the email the user entered, checks to make sure its connected to an account and
     * in a valid format. This email is then passed to Firestore which will send an email to that address with a link to
     * reset their password.
     */
    async function resetPassword(){

        if(email != ""){

            setError(false)

            await firebaseAuth.sendPasswordReset(email)

            if(global.reset == true){

                setReset(true)

            }else{

                if(global.loginError.includes("(auth/invalid-email)")){

                    setErrorMessage("Please enter your email address in the format: yourname@example.com")
                    setError(true)

                }else if(global.loginError.includes("(auth/user-not-found)")){

                    setErrorMessage("No account with that email could be found.")
                    setError(true)

                }

            }

        }else{

            setErrorMessage("Please enter an email.")
            setError(true)

        }

    }

    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <ResetBackground source={ResetBackgroundImage}>

            <BackArrowTouchable onPress={()=>{backToLogin()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color="#8A84FF" />

            </BackArrowTouchable>

            <ResetHeader>Forgotten{"\n"}Password</ResetHeader>

            <ResetSubtext>Enter email address.</ResetSubtext>

            <ResetInput placeholder="Email"
            onChangeText={text => setEmail(text)}/>

            <ResetButton underlayColor={'#6964c4'} activeOpacity={1} onPress={()=>{resetPassword()}}>

                <ResetButtonLabel>RESET</ResetButtonLabel>

            </ResetButton>

            {(isError == true)?
            <ErrorMessageWrapper>

                <ErrorMessage style={{backgroundColor:"#FF0000"}}>

                    <NotificationLabel>{errorMessage}</NotificationLabel>

                </ErrorMessage>
                
            </ErrorMessageWrapper>:null}

            {(isReset == true)?
            <ResetMessage>Reset email sent.</ResetMessage>:null}

        </ResetBackground>

    </MainView>

    );
}

const MainView = styled.View`

    flex:1
    display: flex;
    align-items: center;
    justify-content:center;

`

const ResetBackground = styled.ImageBackground`

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

const ResetHeader = styled.Text`

    font-family:BarlowBold
    font-size:48px
    color:#000000
    margin-left:7.3%
    margin-top:26%
    width:220px
    height:120px

`

const ResetSubtext = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#514F4F
    margin-left:30px
    width:330px
    height:49px

`

const ResetInput = styled.TextInput`

    width:85%
    height:6.4%
    border-radius:10px
    margin-left:7.5%
    margin-top:20px
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5

`

const ResetButton = styled.TouchableHighlight`

    width:36.7%
    height:6.4%
    border-radius:20px
    background-color: #8A84FF
    margin-top:17px
    margin-left:55.67%
    justify-content:center
    align-items:center

`

const ResetButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

const ResetMessage = styled.Text`

    width:100%
    font-family:Barlow
    font-size:24px
    color:#514F4F
    text-align:center
    margin-top:2%

`

const ErrorMessageWrapper = styled.View`

    align-items: center;
    justify-content:center;
    margin-top:10%

`

const ErrorMessage = styled.View`

    border-radius:20px
    align-items: center;
    justify-content:center;
    padding:2%

`

const NotificationLabel = styled.Text`

    font-family:BarlowSemi
    color:#ffffff
    font-size:18px

`

export default ForgotPasswordScreen;
