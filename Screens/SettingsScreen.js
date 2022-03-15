
import React, {useState, useEffect} from "react";
import { Vibration, Alert } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Firebase Config
import * as firebaseAuth from '../firebaseConfig.js'

// Components
import EnterPasswordComponent from "../Components/EnterPasswordComponent";

// Icons
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {

    const[passwordState, setPasswordState] = useState(false)
    const [vibrationEnabled, setVibrationEnabled] = useState(false);
    const toggleSwitch = () => toggleVibrate();

    useEffect(()=>{
        (async () => {
    
            await loadSettings()
    
        })()
    },[])

    function goBack(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }
        navigation.pop()

    }

    async function returnToLogin(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        await AsyncStorage.setItem("password", JSON.stringify("none"))
        await AsyncStorage.setItem("rememberMe", JSON.stringify(false))

        await firebaseAuth.logout()

        navigation.reset({
            index:0,
            routes: [{ name: 'Login' }]
        })

    }

    async function returnToViewSelect(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        const selectedView = await AsyncStorage.getItem("view")

        if(selectedView == '"Adult"'){

            navigation.push("ViewPick")

        }else if(selectedView == '"Child"'){

            setPasswordState(true)

        }

    }

    async function toggleVibrate(){

        await AsyncStorage.setItem("vibration", JSON.stringify("none"))

        setVibrationEnabled(!vibrationEnabled)

        if(vibrationEnabled == false){

            Vibration.vibrate(5)

            global.vibe = 5

            await AsyncStorage.setItem("vibration", JSON.stringify("true"))

        }else if(vibrationEnabled){

            global.vibe = 0

            await AsyncStorage.setItem("vibration", JSON.stringify("false"))

        }

    }

    async function loadSettings(){

        const vibrationState = await AsyncStorage.getItem("vibration")

        if(vibrationState.replace(/"/g,'') == "true"){

            setVibrationEnabled(true)

        }else if(vibrationState.replace(/"/g,'') == "false"){
            setVibrationEnabled(false)

        }

    }
    
    return (
 
    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <SettingsBackground source={MainBackgroundImage}>

            <HeaderBar>

                <BackArrowTouchable onPress={()=>{goBack()}} underlayColor={"transparent"}>

                    <AntDesign name="arrowleft" size={40} color="#ffffff" />

                </BackArrowTouchable>

                <HeaderLabel>Settings</HeaderLabel>

            </HeaderBar>

            <SettingsBody>

                <SettingsScrollView>

                    <BackgroundSettings>

                        <BackgroundSettingsWrapper>

                            <SettingTitleLabel>Background</SettingTitleLabel>

                            <BackgroundSettingDesc>Customise your background by uploading your own image.</BackgroundSettingDesc>

                            <BackgroundSettingControls>

                                <UploadButton>

                                    <UploadButtonWrapper>

                                        <ButtonLabel>UPLOAD</ButtonLabel>

                                        <Feather name="upload" size={24} color="#ffffff"/>

                                    </UploadButtonWrapper>

                                </UploadButton>

                                <ResetButton>

                                    <ButtonLabel>RESET</ButtonLabel>

                                </ResetButton>

                            </BackgroundSettingControls>

                        </BackgroundSettingsWrapper>

                    </BackgroundSettings>

                    <VibrationSettings>

                        <VibrationSettingsWrapper>

                            <SettingTitleLabel>Vibrations</SettingTitleLabel>

                            <VibrationSettingDesc>Enable vibrations across the app.</VibrationSettingDesc>

                            <VibrationSwitch
                                trackColor={{ false: "#767577", true: "#b4b0ff" }}
                                thumbColor={vibrationEnabled ? "#8A84FF" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={vibrationEnabled}/>

                        </VibrationSettingsWrapper>

                    </VibrationSettings>

                </SettingsScrollView>

            </SettingsBody>

            <EnterPasswordComponent
                state={passwordState}
                closePassword={()=>{setPasswordState(false)}}
                navigation={navigation}/>

            <ControlButtonContainer>

                <SwitchViewButton onPress={()=>{returnToViewSelect()}} underlayColor={'#00000033'} activeOpacity={1}>

                    <SwitchViewLabel>SWITCH VIEWS</SwitchViewLabel>

                </SwitchViewButton>

                <LogoutButton onPress={()=>{returnToLogin()}} underlayColor={'#6964c4'} activeOpacity={1}>

                    <LogoutLabel>LOGOUT</LogoutLabel>

                </LogoutButton>

            </ControlButtonContainer>

        </SettingsBackground>

    </MainView>
 
    );
}
 
const MainView = styled.View`
 
    flex:1
    display: flex;
    align-items: center;
    justify-content:center;
 
`
 
const SettingsBackground = styled.ImageBackground`
 
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
 
`

const HeaderBar = styled.View`

    width:100%
    height:12.04%
    background-color:#8A84FF
    align-items:center
    justify-content:center

`

const HeaderLabel = styled.Text`

    font-family:BarlowSemi
    font-size:32px
    color:#ffffff
    margin-top:15px

`

const BackArrowTouchable = styled.TouchableHighlight`

    width:40px
    height:40px
    border-radius:90px
    align-items:center
    justify-content:center
    position:absolute
    left:17px
    top:37%

`

const SettingsBody = styled.View`

    width:85.07%
    height:67.5%
    margin-top:15px

`

const SettingsScrollView = styled.ScrollView`

    width:100%

`

const BackgroundSettings = styled.View`

    width:100%
    height:163px
    background-color:#ffffff
    border-radius:10px
    display:flex
    justify-content:center
    align-items:center

`

const BackgroundSettingsWrapper = styled.View`

    width:95%
    height:90%

`

const SettingTitleLabel = styled.Text`

    font-family:Barlow
    font-size:24px
    color:#000000
`

const BackgroundSettingDesc = styled.Text`

    width:100%
    font-family:Barlow
    font-size:20px
    color:#514F4F

`

const BackgroundSettingControls = styled.View`

    width:100%
    height:53px
    display:flex
    flex-direction:row
    justify-content:space-between
    margin-top:10px

`

const UploadButton = styled.TouchableHighlight`

    width:145px
    height:100%
    background-color:#8A84FF
    border-radius:10px
    display:flex
    justify-content:center
    align-items:center
    
`

const UploadButtonWrapper = styled.View`

    width:90%
    height:100%
    display:flex
    justify-content:space-around
    align-items:center
    flex-direction:row

`

const ButtonLabel = styled.Text`

    font-family:BarlowSemi 
    font-size:24px
    color:#ffffff

`

const ResetButton = styled.TouchableHighlight`

    width:145px
    height:100%
    background-color:#8A84FF
    border-radius:10px
    display:flex
    justify-content:center
    align-items:center
    

`

const VibrationSettings = styled.View`

    width:100%
    height:101px
    background-color:#ffffff
    border-radius:10px
    display:flex
    justify-content:center
    align-items:center
    margin-top:20px

`

const VibrationSettingsWrapper = styled.View`

    width:95%
    height:90%

`

const VibrationSettingDesc = styled.Text`

    width:70%
    font-family:Barlow
    font-size:20px
    color:#514F4F

`

const VibrationSwitch = styled.Switch`

    position:absolute
    right:5px
    top:35px

`






const ControlButtonContainer = styled.View`

    width:85.07%
    height:15%
    margin-top:3%
    justify-content:space-between

`

const SwitchViewButton = styled.TouchableHighlight`

    width:100%
    height:45%
    border-radius:10px
    background-color:#ffffff
    display:flex
    justify-content:center
    align-items:center

`

const SwitchViewLabel = styled.Text`

    font-family:BarlowSemi 
    font-size:24px
    color:#8A84FF

`

const LogoutButton = styled.TouchableHighlight`

    width:100%
    height:45%
    border-radius:10px
    background-color:#8A84FF
    display:flex
    justify-content:center
    align-items:center

`

const LogoutLabel = styled.Text`

    font-family:BarlowSemi 
    font-size:24px
    color:#ffffff

`


export default SettingsScreen;
 