import { View, Text, TouchableOpacity, NativeMethods, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import MainScreen from '../screens/MainScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { STREAMCHAT_KEY } from '@env';
import useChatClient from '../hooks/useChatClient';
import { StreamChat } from 'stream-chat';
import {
    OverlayProvider,
    Chat,
    ChannelList,
  } from 'stream-chat-expo'; // Or stream-chat-expo

import { NativeProps } from 'react-native-safe-area-context/lib/typescript/specs/NativeSafeAreaView';
import { ChatProvider, useChatContext } from '../hooks/chatContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

const DrawerStack = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <ChatProvider>
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <OverlayProvider>
                    <Chat client={chatClient}>
                        <DrawerStack.Navigator
                            options={{
                                defaultStatus: 'open'
                            }}
                            drawerContent={(
                                props: JSX.IntrinsicAttributes 
                                
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
        </GestureHandlerRootView>
        
    </ChatProvider>
    
  )
}

const CustomDrawerContent = 
    (props: 
        JSX.IntrinsicAttributes 
         
        & React.RefAttributes<React.Component<NativeProps, {}, any> 
        & Readonly<NativeMethods>>
    ) => {
        
    const { clientIsReady } = useChatClient();
    const navigation = useNavigation()

    if (clientIsReady) {
      return <Text className='mt-10 text-center font-bold text-2xl'>Loading chat ...</Text>
    }

    const {setChannel} = useChatContext()

    return (
        <SafeAreaView {...props} className='bg-white flex-1'>
            <ChannelList
                onSelect={(channel) => {
                    setChannel(channel);
                    //console.log(channel?.data.name)
                    navigation.navigate('main');
                }} 
            />
            {/** <DrawerItemList {...props}/>*/}     
        </SafeAreaView>
    )
}

export default DrawerNavigation