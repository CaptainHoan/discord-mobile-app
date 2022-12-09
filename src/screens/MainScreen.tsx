import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';
import { useChatContext } from '../hooks/chatContext';

const MainScreen = () => {

  const navigation = useNavigation()
  const { channel } = useChatContext();

  if(!channel) {
    useLayoutEffect(() => {
    navigation.openDrawer()
  },[])
    return (
      <View className=''>
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
    <SafeAreaView className='flex-1 bg-black' >
      <Channel 
        channel={channel} 
        key={channel.data.name} 
        keyboardVerticalOffset={0}
      >
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  )
}

export default MainScreen