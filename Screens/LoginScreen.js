
import React, {useState} from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as firebaseAuth from '../firebaseConfig.js'

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Images
import LoginBackgroundImage from '../Images/LoginBackground.png'

//Componenets
import LoadingComponent from "../Components/LoadingComponent.js";

const LoginScreen = ({ navigation }) => {

    const [isLoaded, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMeState, setRememberMeState] = useState()
    const [isAuto, setAuto] = useState(false)
    const [loginError, setLoginError] = useState(false)

    function openCreateAccount(){

        Vibration.vibrate(5)
        navigation.push("CreateAccount")

    }

    function openForgotPassword(){

        Vibration.vibrate(5)
        global.reset = false
        navigation.push("ForgotPassword")

    }

    function openContactUs(){

        Vibration.vibrate(5)
        navigation.push("LoginHelp")

    }

    async function openViewPick(){

        setLoginError(false)

        Vibration.vibrate(5)

        if(email != "" & password != ""){

            global.newAccount = false

            await firebaseAuth.login(email, password)

            if(global.UID != null){

                if(rememberMeState){

                    saveLoginDetails(email, password)

                }else{

                    saveLoginDetails("none","none")

                }

                global.email = email
                navigation.push("ViewPick")

            }else{

                console.log(global.loginError)

                if(global.loginError.includes("(auth/wrong-password)") || global.loginError.includes("(auth/user-not-found)")){

                    global.userAccountNotification = "Your email and/or password is incorrect."

                }else if(global.loginError.includes("(auth/invalid-email)")){

                    global.userAccountNotification = "Please enter your email address in the format: yourname@example.com"

                }

                setLoginError(true)

            }
            
        }else{

            global.userAccountNotification = "Missing email address or password."

            setLoginError(true)

        }

    }

    function onPressRememberMe(){

        Vibration.vibrate(5)
        setRememberMeState(!rememberMeState)
        saveRememberMeState()

    }

    const saveRememberMeState = async () => {

        await AsyncStorage.setItem("rememberMe", JSON.stringify(!rememberMeState))

    }

    const saveLoginDetails = async (userEmail, userPassword) => {

        await AsyncStorage.setItem("email", JSON.stringify(userEmail))
        await AsyncStorage.setItem("password", JSON.stringify(userPassword))

    }

    const loadLoginDetails = async () => {

        var rememberMe = ""

        try {

            rememberMe = await AsyncStorage.getItem("rememberMe")

        } catch(e) {

            console.log("Error collecting rememberMe state.")

        }

        if(rememberMe == "true"){

            setAuto(true)

            const savedEmail = await AsyncStorage.getItem("email")

            const savedPassword = await AsyncStorage.getItem("password")

            await autoLogin(savedEmail, savedPassword)

        }
    }

    async function autoLogin(email, password){

        await firebaseAuth.login(email.replace(/"/g,''), password.replace(/"/g,''))

        if(global.UID != null){

            const selectedView = await AsyncStorage.getItem("view")

            global.View = selectedView.replace(/"/g,'')

            var view = await AsyncStorage.getItem("view")

            view = view.replace(/"/g,'')

            global.email = email.replace(/"/g,'')

            if(view == "Child"){

                navigation.push("ChildView")

            }else if(view == "Adult"){

                navigation.push("AdultView")

            }

        }

    }
    
    if(isLoaded == false){

        loadLoginDetails()

        loadSettings()

        setLoading(true)

    }

    async function loadSettings(){

        const vibrationState = await AsyncStorage.getItem("vibration")

        if(vibrationState == null){

            await AsyncStorage.setItem("vibration", JSON.stringify("true"))

            global.vibe = 5

        }else{

            if(vibrationState.replace(/"/g,'') == "true"){

                global.vibe = 5

            }else if(vibrationState.replace(/"/g,'') == "false"){

                global.vibe = 0

            }

        }

        var background = await AsyncStorage.getItem("background")

        if(background == null || background == "none"){

            global.background = 10

        }else{

            global.background = background 

        }

        var theme = await AsyncStorage.getItem("theme")

        if(theme == null){

            global.theme = "#8A84FF"

        }else{

            global.theme = theme

        }

        var underlay = await AsyncStorage.getItem("underlay")

        if(underlay == null){

            global.theme = "#6e69cc"

        }else{

            global.underlay = underlay

        }

        const time = await AsyncStorage.getItem("time")

        if(time.replace(/"/g,'') == "24-hour"){

            global.time = "24-hour"

        }else{

            global.time = "12-hour"

        }

    }

    function closePopup(){

        Vibration.vibrate(5)

        setLoginError(false)

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        {(isAuto == true)?
        <LoadingBackground source={LoginBackgroundImage}>

            <LoadingComponent message={"Logging In"}/>

        </LoadingBackground>
        :
        <LoginBackground source={LoginBackgroundImage}>

            {(global.newAccount == true || loginError == true)?

            <UserAccountNotificationWrapper>

                <UserAccountNotification style={{backgroundColor:loginError==true?"#FF0000":"#008000"}} onPress={()=>{closePopup()}}>

                    <NotificationLabel>{global.userAccountNotification}</NotificationLabel>

                </UserAccountNotification>
                
            </UserAccountNotificationWrapper>:null}

            <LoginHeader>Login</LoginHeader>

            <LoginSubtext>Sign in to continue.</LoginSubtext>

            <LoginInput placeholder="Email"
            onChangeText={text => setEmail(text)}/>

            <LoginInput placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}/>

            <HorizontalContainer>

                <RememberMeContainer>

                    <RememberMeButton onPress={()=>{onPressRememberMe()}} underlayColor={"transparent"}>

                        <RememberMeButtonWrapper>

                            {(rememberMeState)?
                            <Ionicons name="ios-checkbox" size={24} color="#8A84FF" />
                            :<MaterialIcons name="check-box-outline-blank" size={24} color="#8A84FF" />}

                        </RememberMeButtonWrapper>

                    </RememberMeButton>

                    <RememberMeLabel>Auto Login</RememberMeLabel>

                </RememberMeContainer>

                <ForgottenPasswordLabel onPress={()=>{openForgotPassword()}}>Forgotten Password</ForgottenPasswordLabel>

            </HorizontalContainer>

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

        </LoginBackground>}

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
    margin-top:35%
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

const HorizontalContainer = styled.View`

    display:flex
    flex-direction:row
    width:85%
    height:4.5%
    margin-left:7.5%
    margin-top:1.5%

`

const RememberMeContainer = styled.View`

    height:100%
    display:flex
    flex-direction:row

`

const RememberMeButton = styled.TouchableHighlight`

    height:80%
    width:15%
    border-radius:5px

`

const RememberMeButtonWrapper = styled.View`

    width:100%
    height:100%
    display:flex
    align-items:center
    justify-content:center
    border-radius:5px

`

const RememberMeLabel = styled.Text`

    font-family:BarlowSemi
    font-size:18px
    color:#8A84FF
    margin-left:2%

`

const ForgottenPasswordLabel = styled.Text`

    height:100%
    font-family:BarlowSemi
    font-size:18px
    color:#8A84FF
    position:absolute
    right:0
    text-align:right

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
    height:3.7%
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

const UserAccountNotificationWrapper = styled.View`

    width:100%
    margin-bottom:10%
    position:absolute
    bottom:0
    align-items: center;
    justify-content:center;

`

const UserAccountNotification = styled.TouchableOpacity`

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

const LoadingBackground = styled.ImageBackground`

    width:100%;
    height:100%;
    display: flex;
    align-items:center
    justify-content:center

`

export default LoginScreen;
