import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useChatContext } from '../hooks/chatContext';

const MainScreen = () => {

  const { channel } = useChatContext();
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.dispatch(DrawerActions.toggleDrawer())
},[])
  
  if(!channel) {
    return 
  }
    const signOutUser = async() => {
        await signOut(auth)
        .then (() => {
            //signOut user
        })
        .catch(err => console.log(err.message))
    }

  return (
    <SafeAreaView className='flex-1 ' >
      <View>
        <Text>{channel.data.name}</Text>
      </View>
      <Channel 
        channel={channel} 
        key={channel?.data.name} 
        keyboardVerticalOffset={0}
      >
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  )
}

export default MainScreen