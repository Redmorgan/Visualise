/**
 * @fileoverview The component for the page that the users uses to create accounts.
 */

import React, {useState} from "react";
import { Vibration, Alert } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';

import * as firebaseAuth from '../firebaseConfig.js'

 // Images
import LoginBackgroundImage from '../Images/LoginBackground.png'

// Icons
import { AntDesign } from '@expo/vector-icons';

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 *  
 * @returns A page where users are able to create a new account, containing 3 input boxes and a button.
 */
const CreateAccountScreen = ({ navigation }) => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[isError, setError] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")

    /**
     * @summary Takes the user back to the login page
     * 
     * @description When the user presses the back arrow this function runs and it takes
     * the user back to the login screen.
     */
    function backToLogin(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }
        navigation.pop()

    }

    /**
     * @summary Create an account for the user as well as error checking inputs
     * 
     * @description Takes the user entered email, password, and confirmation password and performs a series
     * of error check to make sure the inputs are valid to make an account. If the checks are passed then a new
     * user account is created and the user is taken back to the login page and shown a message to inform them
     * their account has been successfully created. This account can now be used to login.
     */
    const createAccount = async () => {

        setError(false)

        // If any of the fields are empty
        if(email != "" && password != "" && confirmPassword != ""){

            // If the password and confirmation password match
            if(password == confirmPassword){

                await firebaseAuth.signup(email, password)

                // If firebase auth does not return an error
                if(global.loginError != null){

                    // If the email address chosen is already in use
                    if(global.loginError.includes("(auth/email-already-in-use)")){

                        setErrorMessage("An account with that email address already exists.")
                        setError(true)

                    // If the email address chosen is in an invalid format
                    }else if(global.loginError.includes("(auth/invalid-email)")){

                        setErrorMessage("Please enter your email address in the format: yourname@example.com")
                        setError(true)

                    }

                }else{

                    global.newAccount = true
                    global.userAccountNotification = "Your account has successfully been created."
                    global.email = email

                    navigation.push("Login")

                }

            }else{

                setErrorMessage("Your passwords do not match.  Please try again.")
                setError(true)

            }

        }else{

            setErrorMessage("One or more fields are currently empty. Please try again.")
            setError(true)

        }

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <LoginBackground source={LoginBackgroundImage}>

            {(isError == true)?

            <UserAccountNotificationWrapper>

                <UserAccountNotification style={{backgroundColor:"#FF0000"}}>

                    <NotificationLabel>{errorMessage}</NotificationLabel>

                </UserAccountNotification>
                
            </UserAccountNotificationWrapper>:null}

            <BackArrowTouchable onPress={()=>{backToLogin()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color="#8A84FF" />

            </BackArrowTouchable>

            <LoginHeader>Create an{"\n"}Account</LoginHeader>

            <LoginInput placeholder="Email"
                onChangeText={text => setEmail(text)}/>

            <LoginInput placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}/>

            <LoginInput placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={text => setConfirmPassword(text)}/>

            <SignUpButton underlayColor={'#6964c4'} activeOpacity={1} onPress={()=>{createAccount()}}>

                <SignUpButtonLabel>SIGN UP</SignUpButtonLabel>

            </SignUpButton>

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
    margin-left:7.5%
    margin-top:59px
    width:300px
    height:130px

`

const LoginInput = styled.TextInput`

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

const SignUpButton = styled.TouchableHighlight`

    width:36.7%
    height:6.4%
    border-radius:20px
    background-color: #8A84FF
    margin-top:31px
    margin-left:55.67%
    justify-content:center
    align-items:center

`

const SignUpButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

const UserAccountNotificationWrapper = styled.View`

    width:100%
    margin-bottom:10%
    position:absolute
    bottom:0
    align-items: center;
    justify-content:center;

`

const UserAccountNotification = styled.View`

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

export default CreateAccountScreen;
