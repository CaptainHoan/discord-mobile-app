import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Channel, MessageInput, MessageList, OverlayProvider } from 'stream-chat-expo';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useChatContext } from '../hooks/chatContext';
import type { DeepPartial, Theme } from 'stream-chat-expo';

export const {width, height}: {width: number, height: number} = Dimensions.get('screen')

const MainScreen = () => {

  const { channel } = useChatContext();
  const navigation = useNavigation();

  // remove the date shown above the chat
  const MyEmptyComponent = () => null

  if(!channel) {
    return (
      <View style={{backgroundColor: '#121212', flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
          className='items-center justify-center' style={{marginTop: height / 2}}
        >
          <Text className='text-xl font-bold text-white'>
            Click to start chatting
          </Text>
        </TouchableOpacity>
      </View>
      
    )
  }

  return (
    <SafeAreaView style={{backgroundColor: '#121212'}}>
        <Channel 
        channel={channel} 
        key={channel?.data.name} 
        keyboardVerticalOffset={0}
        DateHeader={MyEmptyComponent}
      >
        <View className='mt-2'>
          <Text className='text-center text-xl font-bold text-white'># {channel.data.name}</Text>
        </View>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  )
}

export default MainScreen