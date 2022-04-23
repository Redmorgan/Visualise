/**
 * @fileoverview The component for the screen where the user selects the view they want to use.
 */

import React, {useState} from 'react';
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
import LoginBackgroundImage from '../Images/LoginBackground.png'

// Icons
import { AntDesign } from '@expo/vector-icons';

/** 
 * @param {Function} navigation - Passed through navigation function for navigation between stacks.
 * 
 * @returns A page with two options for the user to select the view they want to use.
 */
const ViewPickScreen = ({ navigation }) => {

    const[viewSelected, setSelectedView] = useState("")

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
     * @summary Sets the view the user has selected.
     * 
     * @param {String} view - The view the user has selected. 
     * 
     * @description When the user presses on the "Adult" or "Child" view button this function will
     * highlight that button
     */
    function selectView(view){

        Vibration.vibrate(5)
        setSelectedView(view)

    }

    /**
     * @summary Opens up the main application based on the selected view.
     * 
     * @description Based on what view the user has selected two versions of the main application will load.
     * If the user selected "Adult" the adult view will display which has the added "Tasks", and if they
     * selected "Child" it will show them the child view which doesnt have the "Tasks tab".
     */
    async function openMainApp(){

        if(viewSelected == "Adult"){

            Vibration.vibrate(5)
            global.View = "Adult"
            await AsyncStorage.setItem("view", JSON.stringify("Adult"))
            navigation.reset({
                index:0,
                routes: [{ name: 'AdultView' }]
            })

        }else if(viewSelected == "Child"){

            Vibration.vibrate(5)
            global.View = "Child"
            await AsyncStorage.setItem("view", JSON.stringify("Child"))
            navigation.reset({
                index:0,
                routes: [{ name: 'ChildView' }]
            })

        }

    }

    return (

    <MainView>

        <StatusBar backgroundColor="transparent"/>

        <LoginBackground source={LoginBackgroundImage}>

            <BackArrowTouchable onPress={()=>{backToLogin()}} underlayColor={"transparent"}>

                <AntDesign name="arrowleft" size={40} color="#8A84FF" />

            </BackArrowTouchable>

            <LoginHeader>Select a{"\n"}View</LoginHeader>

            <LoginSubtext>Logging in as an adult or child?</LoginSubtext>

            <ViewSelectorContainer>

                <ViewSelectorTouchable onPress={()=>{selectView("Adult")}} style={{borderRadius:90, borderColor:"#6964c4", borderWidth:viewSelected=="Adult"?5:0}}>

                    <SelectorContainer>

                        <SelectorLabel>Adult</SelectorLabel>

                    </SelectorContainer>

                </ViewSelectorTouchable>

                <ViewSelectorTouchable onPress={()=>{selectView("Child")}} style={{borderRadius:90, borderColor:"#6964c4", borderWidth:viewSelected=="Child"?5:0}}>

                    <SelectorContainer>

                        <SelectorLabel>Child</SelectorLabel>

                    </SelectorContainer>

                </ViewSelectorTouchable>

            </ViewSelectorContainer>

            {(viewSelected != "")?
            <ConfirmButtonWrapper>

                <ConfirmButton underlayColor={'#6964c4'} activeOpacity={1} onPress={()=>{openMainApp()}}>

                    <ConfirmButtonLabel>CONFIRM</ConfirmButtonLabel>

                </ConfirmButton>

            </ConfirmButtonWrapper>:null}

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
    margin-left:30px
    margin-top:12.4%
    width:330px
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

const ViewSelectorContainer = styled.View`

    height:141px
    width:100%
    display:flex
    flex-direction:row
    justify-content:space-around
    margin-top:36px

`

const ViewSelectorTouchable = styled.TouchableHighlight`

    width:116px
    height:116px
    border-radius:90px

`

const SelectorContainer = styled.View`

    width:100%
    height:100%
    display:flex
    align-items:center
    justify-content:center
    border-radius:90px
    background-color:#8A84FF

`

const SelectorLabel = styled.Text`

    font-family:BarlowSemi
    font-size:36px
    color:#ffffff
    margin-bottom:5px

`

const ConfirmButtonWrapper = styled.View`

    width:100%
    height:53px
    margin-top:17px
    align-items:center

`

const ConfirmButton = styled.TouchableHighlight`

    width:151px
    height:100%
    border-radius:20px
    background-color: #8A84FF
    justify-content:center
    align-items:center

`

const ConfirmButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

export default ViewPickScreen;
