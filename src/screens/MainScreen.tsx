import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useChatContext } from '../hooks/chatContext';

const {width, height}: {width: number, height: number} = Dimensions.get('screen')

const MainScreen = () => {

  const { channel } = useChatContext();
  const navigation = useNavigation();
  
  if(!channel) {
    return (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
        className='items-center justify-center' style={{marginTop: height / 2}}
      >
        <Text className='text-xl font-bold '>
          Click to start chatting
        </Text>
      </TouchableOpacity>
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
    <SafeAreaView className='flex-1' >
      <Channel 
        channel={channel} 
        key={channel?.data.name} 
        keyboardVerticalOffset={0}
      >
        <View className="">
          <Text className='text-center text-xl font-bold'>{channel.data.name}</Text>
        </View>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  )
}

export default MainScreen