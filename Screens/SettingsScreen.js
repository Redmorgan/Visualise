/**
 * @file The component for the settings page which lets users configure some settings within the application.
 */

import React, {useState, useEffect} from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Images
import MainBackgroundImage from '../Images/MainBackground.png'

// Firebase Config
import * as firebaseAuth from '../firebaseConfig.js'

// Components
import EnterPasswordComponent from "../Components/EnterPasswordComponent";

// Icons
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks.  
 *  
 * @returns A component containing various application settings as well as buttons to switch the view and logout.
 */
const SettingsScreen = ({ navigation }) => {

    const[passwordState, setPasswordState] = useState(false)
    const [vibrationEnabled, setVibrationEnabled] = useState(false);
    const toggleVibrateSwitch = () => toggleVibrate();
    const [militaryTimeEnabled, setMilitaryTimeEnabled] = useState(false);
    const toggleTimeSwitch = () => toggleTime();
    const [colourTheme, setColourTheme] = useState("")
    useEffect(()=>{
        (async () => {

            await loadSettings()

        })()
    },[])

    /**
     * @summary Takes the user back to the previous page.
     * 
     * @description When the back button is pressed it will take the user back to the previous page, this will either be the
     * "Calendar" tab or the "Today" tab
     */
    function goBack(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        navigation.pop()

    }

    /**
     * @summary Takes the user back to the login page
     * 
     * @description When the user presses "LOGOUT" it will set the remember me state back to false, log the user out from
     * Firebase auth, and then take the user back to the login screen.
     */
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

    /**
     * @summary Takes the user back to the view select screen.
     * 
     * @description The main purpose of this funciton is to take the user back to the view select screen. However, to stop children
     * from gaining access to admin controls, if the user is on the adult view they can switch to the child view straight away, but if
     * they are on the child view a pop-up will appear and the user will have to reenter the email for the account before being able
     * to switch views.
     */
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

    /**
     * @summary Setting for toggling vibrations across the app
     * 
     * @description Based on the postion of the toggle switch will change if vibrations are enabled across the application. The chosen setting
     * gets saved to the local storage so that it can be reapplied when a new session of the application is loaded.
     */
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

    /**
     * @summary Setting for letting users select a custom background
     * 
     * @description When the "UPLOAD" button is pressed the user will first be prompted with an indevice notification asking for the app
     * to have permission to access their local gallery. If they select yes the photo gallery will open. Once they select a photo they will
     * have to crop it to a 3:4 ration, once they click confirm this picture will now be displayed as the background for the "Calendar" and
     * "Today" tabs. If the user selects no nothing will happen and they will have to keep pressing the button until they accept the permission
     * otherwise they wont be able to add a background
     * 
     */
    async function pickBackground(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        await ImagePicker.requestMediaLibraryPermissionsAsync()
        .then(function(x){

            if(x["granted"] == true){

                let result = ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [3, 4],
                    quality: 1,
                })
                .then((response)=>{
        
                    global.background = response['uri']
        
                    AsyncStorage.setItem("background", response['uri'])
        
                })

            }

        })

    }

    /**
     * @summary Resets the background image to default
     * 
     * @description When the "RESET" button is pressed the currently set background gets reverted back to the default image.
     */
    async function resetBackground(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        await AsyncStorage.setItem("background", "none")

        global.background = 10

    }

    /**
     * @summary Preloads the already selected settings.
     * 
     * @description Updates all the setting indicators (switches and buttons) to the correct states based on
     * what settings the user has already set.
     */
    async function loadSettings(){

        const vibrationState = await AsyncStorage.getItem("vibration")

        if(vibrationState.replace(/"/g,'') == "true"){

            setVibrationEnabled(true)

        }else if(vibrationState.replace(/"/g,'') == "false"){
            setVibrationEnabled(false)

        }

        const colourTheme = await AsyncStorage.getItem("theme")

        if(colourTheme == null){

            await AsyncStorage.setItem("theme", "#8A84FF")

            global.theme = "#8A84FF"

            setColourTheme("#8A84FF")

        }else{

            global.theme = colourTheme

            setColourTheme(colourTheme)

        }

        const time = await AsyncStorage.getItem("time")

        if(time.replace(/"/g,'') == "24-hour"){

            setMilitaryTimeEnabled(true)

        }else{

            await AsyncStorage.setItem("time", "12-hour")

            setMilitaryTimeEnabled(false)

        }

    }

    /**
     * @summary Sets the theme the user has selected.
     * 
     * @param {String} colour - Colour theme the user has selected.
     * 
     * @description Takes the theme the user has selected, saves a copy of it locally so that it can be loaded
     * on the next instance of the application. The theme is also then applied across the application.
     */
    async function selectTheme(colour){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        await AsyncStorage.setItem("theme", colour)

        global.theme = colour

        setUnderlay(colour)

        setColourTheme(colour)

    }

    /**
     * @summary Sets the underlay colour based on the theme selection
     * 
     * @param {String} colour - Colour theme the user has selected. 
     * 
     * @description There is no automated way of handling the underlay colours for on press events, this function
     * sets the underlay colour globally based on the theme selected by the user.
     */
    async function setUnderlay(colour){

        var underlay;

        if(colour == "#8A84FF"){

            underlay = "#6e69cc"

        }else if(colour == "#ffb3ba"){

            underlay = "#cc8f94"

        }else if(colour == "#ffdfba"){

            underlay = "#ccb294"

        }else if(colour == "#baffc9"){

            underlay = "#94cca0"

        }else if(colour == "#bae1ff"){

            underlay = "#94b4cc"

        }

        global.underlay = underlay

        await AsyncStorage.setItem("underlay", underlay)

    }

    /**
     * @summary Switches the timeformat between 12-hour and 24-hour format.
     * 
     * @description This function lets users switch between the 12-hour and 24-hour format, this affects the times seen on
     * the "Today" tab. This setting is also saved locally for use when loading a new session of the application.
     */
    async function toggleTime(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        await AsyncStorage.setItem("time", JSON.stringify("none"))

        setMilitaryTimeEnabled(!militaryTimeEnabled)

        if(militaryTimeEnabled == false){

            global.time = "24-hour"

            await AsyncStorage.setItem("time", JSON.stringify("24-hour"))

        }else if(militaryTimeEnabled){

            global.time = "12-hour"

            await AsyncStorage.setItem("time", JSON.stringify("12-hour"))

        }

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <SettingsBackground source={MainBackgroundImage}>

            <HeaderBar style={{backgroundColor:global.theme}}>

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

                                <UploadButton onPress={()=>{pickBackground()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

                                    <UploadButtonWrapper>

                                        <ButtonLabel>UPLOAD</ButtonLabel>

                                        <Feather name="upload" size={24} color="#ffffff"/>

                                    </UploadButtonWrapper>

                                </UploadButton>

                                <ResetButton onPress={()=>{resetBackground()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

                                    <ButtonLabel>RESET</ButtonLabel>

                                </ResetButton>

                            </BackgroundSettingControls>

                        </BackgroundSettingsWrapper>

                    </BackgroundSettings>

                    <ColourThemeSettings>

                        <ColourThemeSettingsWrapper>

                            <SettingTitleLabel>Colour Theme</SettingTitleLabel>

                            <ColourThemeSettingDesc>Select a colour theme to use across the app.</ColourThemeSettingDesc>

                            <ColourButtonContainer>

                                <ColourThemeButton style={{backgroundColor:"#8A84FF", borderColor:"transparent", borderWidth:colourTheme!="#8A84FF"?5:0}} onPress={()=>{selectTheme("#8A84FF")}}/>

                                <ColourThemeButton style={{backgroundColor:"#ffb3ba", borderColor:"transparent", borderWidth:colourTheme!="#ffb3ba"?5:0}} onPress={()=>{selectTheme("#ffb3ba")}}/>

                                <ColourThemeButton style={{backgroundColor:"#ffdfba", borderColor:"transparent", borderWidth:colourTheme!="#ffdfba"?5:0}} onPress={()=>{selectTheme("#ffdfba")}}/>

                                <ColourThemeButton style={{backgroundColor:"#baffc9", borderColor:"transparent", borderWidth:colourTheme!="#baffc9"?5:0}} onPress={()=>{selectTheme("#baffc9")}}/>

                                <ColourThemeButton style={{backgroundColor:"#bae1ff", borderColor:"transparent", borderWidth:colourTheme!="#bae1ff"?5:0}} onPress={()=>{selectTheme("#bae1ff")}}/>

                            </ColourButtonContainer>

                        </ColourThemeSettingsWrapper>

                    </ColourThemeSettings>

                    <VibrationSettings>

                        <VibrationSettingsWrapper>

                            <SettingTitleLabel>Vibrations</SettingTitleLabel>

                            <VibrationSettingDesc>Enable vibrations across the app.</VibrationSettingDesc>

                            <VibrationSwitch
                                trackColor={{ false: "#767577", true: global.theme }}
                                thumbColor={vibrationEnabled ? global.underlay : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleVibrateSwitch}
                                value={vibrationEnabled}/>

                        </VibrationSettingsWrapper>

                    </VibrationSettings>

                    <TimeFormatSetting>

                        <TimeFormatSettingsWrapper>

                            <SettingTitleLabel>Date Format</SettingTitleLabel>

                            <TimeFormatSettingDesc>Enable 24-hour clock format.</TimeFormatSettingDesc>

                            <TimeSwitch
                                trackColor={{ false: "#767577", true: global.theme }}
                                thumbColor={militaryTimeEnabled ? global.underlay : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleTimeSwitch}
                                value={militaryTimeEnabled}/>

                        </TimeFormatSettingsWrapper>

                    </TimeFormatSetting>

                </SettingsScrollView>

            </SettingsBody>

            <EnterPasswordComponent
                state={passwordState}
                closePassword={()=>{setPasswordState(false)}}
                navigation={navigation}/>

            <ControlButtonContainer>

                <SwitchViewButton onPress={()=>{returnToViewSelect()}} underlayColor={'#CCCCCC'} activeOpacity={1}>

                    <SwitchViewLabel style={{color:global.theme}}>SWITCH VIEWS</SwitchViewLabel>

                </SwitchViewButton>

                <LogoutButton onPress={()=>{returnToLogin()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

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

    width:43%
    height:100%
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

    width:43%
    height:100%
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

const ColourThemeSettings = styled.View`

    width:100%
    background-color:#ffffff
    border-radius:10px
    display:flex
    justify-content:center
    align-items:center
    margin-top:20px

`

const ColourThemeSettingsWrapper = styled.View`

    width:95%

`

const ColourThemeSettingDesc = styled.Text`

    width:70%
    font-family:Barlow
    font-size:20px
    color:#514F4F

`

const ColourButtonContainer = styled.View`

    width:100%
    display:flex
    flex-direction:row
    flex-wrap:wrap
    justify-content:space-between
    margin-top:1.5%

`

const ColourThemeButton = styled.TouchableOpacity`

    width:60px
    height:60px
    border-radius:10px
    margin-bottom:8px

`

const TimeFormatSetting = styled.View`

    width:100%
    height:100px
    background-color:#ffffff
    border-radius:10px
    display:flex
    justify-content:center
    align-items:center
    margin-top:20px
    margin-bottom:20px

`

const TimeFormatSettingsWrapper = styled.View`

    width:95%
    height:90%

`

const TimeFormatSettingDesc = styled.Text`

    width:70%
    font-family:Barlow
    font-size:20px
    color:#514F4F

`

const TimeSwitch = styled.Switch`

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
