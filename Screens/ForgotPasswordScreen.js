
 import React, { useState } from "react";
 import { Vibration, Alert } from "react-native";
 import styled from "styled-components/native";
 import { StatusBar } from 'expo-status-bar';

 import * as firebaseAuth from '../firebaseConfig.js'
 
 // Images
import ResetBackgroundImage from '../Images/LoginBackground.png'

// Icons
import { AntDesign } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
  
    const[email, setEmail] = useState("")
    const [isEmpty, setEmpty] = useState(false)
    const [isReset, setReset] = useState(false)

    function backToReset(){

        Vibration.vibrate(5)
        navigation.pop()
    
    }

    async function resetPassword(){

        if(email != ""){

            setEmpty(false)

            await firebaseAuth.sendPasswordReset(email)

            if(global.reset == true){

                setReset(true)

            }

        }else{

            setEmpty(true)

        }

    }
    


    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <ResetBackground source={ResetBackgroundImage}>

            <BackArrowTouchable onPress={()=>{backToReset()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color="#8A84FF" />

            </BackArrowTouchable>

            <ResetHeader>Forgotten{"\n"}Password</ResetHeader>

            <ResetSubtext>Enter email address.</ResetSubtext>

            <ResetInput placeholder="Email"
            onChangeText={text => setEmail(text)}/>

            <ResetButton underlayColor={'#6964c4'} activeOpacity={1} onPress={()=>{resetPassword()}}>

                <ResetButtonLabel>RESET</ResetButtonLabel>

            </ResetButton>

            {(isEmpty == true)?
            <ResetMessage>No email entered</ResetMessage>:null}

            {(isReset == true)?
            <ResetMessage>Reset email sent</ResetMessage>:null}

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

export default ForgotPasswordScreen;
 