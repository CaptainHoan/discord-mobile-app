import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'

const MainScreen = () => {

    const signOutUser = async() => {
        await signOut(auth)
        .then (() => {
            //signOut user
        })
        .catch(err => console.log(err.message))
    }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signOutUser}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MainScreen