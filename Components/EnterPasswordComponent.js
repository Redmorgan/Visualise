/**
 * @fileoverview Contains the component that is used as a password prompt pop-up when a child user tries to switch to the adult view.
 */

import React, {useState} from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";
import * as firebaseAuth from '../firebaseConfig.js'

// Icons
import { AntDesign } from '@expo/vector-icons';

/**
 * 
 * @param {Boolean}  state - The current visibile state of the pop-up (True = Visible, False = Invisible).
 * @param {Function} closePassword - The function that closes the password modal.
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 *  
 * @returns A pop-up that asks a user to enter the password for their account.
 */
const EnterPasswordComponent = ({ state, closePassword, navigation }) => {

    const[password, setPassword] = useState("")

    /**
     * @summary Closes the password pop-up
     * 
     * @description When the close button on the pop-up is pressed this function is run which hides the pop-up to reveal the settings page again.
     */
    function closePasswordPopup(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        closePassword()

    }

    /**
     * @summary Takes the user to the ViewSelectScreen if the entered password is correct
     * 
     * @summary When the user presses the "SWITCH" button the password from the input box is taken, if the password is valid then
     * the user is taken to the view select screen, otherwise they just stay on the page
     */
    async function switchView(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }

        await firebaseAuth.checkPassword(password)

        if(global.loginError == null){

            navigation.reset({
                index:0,
                routes: [{ name: 'ViewPick' }]
            })

        }

    }

    return (

    <EnterPasswordModal
        visible={state}
        animationType='fade'
        transparent={true}>

        <EnterPasswordContainer>

            <EnterPasswordBody>

                <CloseButton underlayColor={'#00000033'} activeOpacity={1} onPress={()=>{closePasswordPopup()}}>

                    <AntDesign name="close" size={35} color="black" />

                </CloseButton>

                <EnterPasswordWrapper>

                    <PasswordInfoLabel>Password</PasswordInfoLabel>

                    <PasswordInput
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}/>

                    <SwitchViewButton onPress={()=>{switchView()}} underlayColor={global.underlay} activeOpacity={1} style={{backgroundColor:global.theme}}>

                        <SwitchViewButtonLabel>SWITCH</SwitchViewButtonLabel>

                    </SwitchViewButton>

                </EnterPasswordWrapper>

            </EnterPasswordBody>
            
        </EnterPasswordContainer>

    </EnterPasswordModal>

    );
}

const EnterPasswordModal = styled.Modal`
`

const EnterPasswordContainer = styled.View`

    flex:1
    justify-content:center;
    align-items:center;
    background-color: rgba(181,181,181,0.5);

`

const EnterPasswordBody = styled.View`

    width:85%
    height:25%
    background-color:#ffffff;
    border-radius:10px;
    display:flex
    justify-content:center;
    align-items:center;
    elevation:4

`

const EnterPasswordWrapper = styled.View`

    width:95%
    display:flex
    justify-content:center;
    align-items:center;

`

const PasswordInfoLabel = styled.Text`

    font-family:Barlow
    font-size:24px
    width:85%

`

const PasswordInput = styled.TextInput`

    width:85%
    height:25.6%
    border-radius:10px
    margin-top:2%
    font-family:Barlow
    font-size:24px
    background-color:#ffffff
    padding-left:10px
    elevation:5

`


const SwitchViewButton = styled.TouchableHighlight`

    width:36.7%
    height:30%
    border-radius:20px
    margin-top:4%
    margin-left:47%
    justify-content:center
    align-items:center

`

const SwitchViewButtonLabel = styled.Text`

    font-family:BarlowSemi
    font-size:24px
    color:#ffffff

`

const CloseButton = styled.TouchableHighlight`

    width:35px
    height:35px
    position:absolute
    top:0
    right:0
    display:flex
    justify-content:center;
    align-items:center;
    margin-top:3%
    margin-right:3%
    border-radius:10px

`

export default EnterPasswordComponent;
