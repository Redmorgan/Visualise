import React, {useState} from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";

import * as firebaseAuth from '../firebaseConfig.js'

// Icons
import { AntDesign } from '@expo/vector-icons';

const EnterPasswordComponent = ({ state, closePassword, navigation }) => {

    const[password, setPassword] = useState("")

    function closePasswordPopup(){

        if(global.vibe != 0){

            Vibration.vibrate(5)

        }
        
        closePassword()

    }

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

                    <SwitchViewButton onPress={()=>{switchView()}} underlayColor={'#6964c4'} activeOpacity={1}>

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
    background-color: #8A84FF
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
