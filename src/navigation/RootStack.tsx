import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import DrawerNavigation from './DrawerNavigation';

const RootStack = () => {

    const [isLogIn, setIsLogIn] = useState(false)

    onAuthStateChanged(auth, (user) => {
        user ? setIsLogIn(true) : setIsLogIn(false)
    })

  return (
    <>
        {isLogIn === true
            ? (<DrawerNavigation />)
            : (<LoginScreen />) 
        }
    </>
  )
}

export default RootStack