import React, {useState, useEffect} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import LoginWelcome from './LoginWelcome';
import Login from './Login';
import SignUp from './SignUp';
import globalStyles from '../styles';

const background = require('../assets/login_img.jpg');

const LoginCotroller = ({navigation}) => {
    const [screen, setScreen] = useState('init');

    useEffect(() => {
          navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
          });
    },[navigation]);

    let currentScreen;

    if (screen === "init") currentScreen = <LoginWelcome setScreen={setScreen} />
    else if (screen === 'login') currentScreen = <Login setScreen={setScreen} />
    else if(screen === 'signup') currentScreen = <SignUp setScreen={setScreen} />

    return (
        <ImageBackground source={background} style={[globalStyles.container, styles.container]}>
            {currentScreen}
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    }
}) 
export default LoginCotroller;