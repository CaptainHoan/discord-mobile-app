import { Text, NativeMethods, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer'
import MainScreen from '../screens/MainScreen';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
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

const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

type DrawerParamsType = {
    main: undefined
}

type drawerNavigationPropsType = DrawerNavigationProp<DrawerParamsType, 'main'>

const DrawerStack = createDrawerNavigator<DrawerParamsType>();

const DrawerNavigation = () => {
  return (
    <ChatProvider>
        <OverlayProvider>
            <Chat client={chatClient}>
                <NavigationContainer>
                    <DrawerStack.Navigator
                        drawerType= 'slide'
                        overlayColor="transparent"
                        drawerContent={(
                                props: JSX.IntrinsicAttributes  
                                & React.RefAttributes<React.Component<NativeProps, {}, any> 
                                & Readonly<NativeMethods>>
                                ) => <CustomDrawerContent {...props} />
                            }
                    >
                        <DrawerStack.Screen name="main" component={MainScreen} /> 
                    </DrawerStack.Navigator>
                </NavigationContainer> 
            </Chat>
        </OverlayProvider>
    </ChatProvider>
  )
}

const CustomDrawerContent = 
    (props: 
        JSX.IntrinsicAttributes 
        & React.RefAttributes<React.Component<NativeProps, {}, any> 
        & Readonly<NativeMethods>>
    ) => {

    const navigation = useNavigation<drawerNavigationPropsType>();
    const { clientIsReady } = useChatClient();
    const {setChannel} = useChatContext();

    if (!clientIsReady) {
      return <Text className='mt-10 text-center font-bold text-2xl'>Loading chat ...</Text>
    }

    return (
        <SafeAreaView {...props} className='bg-white flex-1'>
            <ChannelList
                onSelect={(channel) => {
                    setChannel(channel);
                    navigation.navigate('main');
                }} 
            />
        </SafeAreaView>
    )
}

export default DrawerNavigation