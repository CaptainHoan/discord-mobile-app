import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo';
import { useRoute } from '@react-navigation/native';

const MainScreen = () => {

  const route = useRoute()
  const channel = route?.params?.channel

  if(!channel) {
    return (
      <View>
        <Text>haha</Text>
      </View>
    )
  }

    const signOutUser = async() => {
        await signOut(auth)
        .then (() => {
            //signOut user
        })
        .catch(err => console.log(err.message))
    }

  return (
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel> 
  )
}

export default MainScreen