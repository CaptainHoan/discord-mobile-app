import { View, Text, TouchableOpacity, NativeMethods } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import MainScreen from '../screens/MainScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeSafeAreaViewProps, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { STREAMCHAT_KEY } from '@env';
import useChatClient from '../hooks/useChatClient';
import { StreamChat } from 'stream-chat';
import {
    OverlayProvider,
    Chat,
    ChannelList
  } from 'stream-chat-expo'; // Or stream-chat-expo

import { NativeProps } from 'react-native-safe-area-context/lib/typescript/specs/NativeSafeAreaView';

const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

const DrawerStack = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
        <OverlayProvider>
            <Chat client={chatClient}>
                <DrawerStack.Navigator
                    options={{
                        defaultStatus: 'open'
                    }}
                    drawerContent={(
                        props: JSX.IntrinsicAttributes 
                        & NativeSafeAreaViewProps 
                        & React.RefAttributes<React.Component<NativeProps, {}, any> 
                        & Readonly<NativeMethods>>
                        ) => <CustomDrawerContent {...props} />
                    }
                >
                    <DrawerStack.Screen name="main" component={MainScreen}/>   
                </DrawerStack.Navigator>
            </Chat>
        </OverlayProvider>
    </NavigationContainer>  
  )
}

const CustomDrawerContent = 
    (props: 
        JSX.IntrinsicAttributes 
        & NativeSafeAreaViewProps 
        & React.RefAttributes<React.Component<NativeProps, {}, any> 
        & Readonly<NativeMethods>>
    ) => {
        
    const { clientIsReady } = useChatClient();
    const navigation = useNavigation()

    if (clientIsReady) {
      return <Text className='mt-10 text-center font-bold text-2xl'>Loading chat ...</Text>
    }

    const onChannelSelect = (channel) => {
        if(channel) {
            navigation.navigate('main', {channel})
            console.log(channel)
        }
        
    }

    return (
        <SafeAreaView {...props} className='bg-white flex-1'>
            <ChannelList
                onSelect={onChannelSelect} 
            />
            {/** <DrawerItemList {...props}/>*/}     
        </SafeAreaView>
    )
}

export default DrawerNavigation