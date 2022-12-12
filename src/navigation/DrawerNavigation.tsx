import { Text, NativeMethods, View  } from 'react-native'
import React from 'react'
import { 
    createDrawerNavigator, 
    DrawerItem, 
    DrawerNavigationProp} from '@react-navigation/drawer'
import MainScreen from '../screens/MainScreen';
import { NavigationContainer, useNavigation,} from '@react-navigation/native';
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
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import type { DeepPartial, Theme } from 'stream-chat-expo';
import { Colors } from '../constants/Colors';

const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

type DrawerParamsType = {
    main: undefined
}

type drawerNavigationPropsType = DrawerNavigationProp<DrawerParamsType, 'main'>

const DrawerStack = createDrawerNavigator<DrawerParamsType>();

const DrawerNavigation = () => {

    const theme: DeepPartial<Theme> = {
        colors: Colors
    }

  return (
    <ChatProvider>
        <OverlayProvider value={{style: theme}}>
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

    const signOutUser = async() => {
        await signOut(auth)
        .then (() => {
            //signOut user
        })
        .catch(err => console.log(err.message))
    }

    return (
        <View {...props} className='flex-1 pt-3' style={{backgroundColor: '#121212'}}>
            <ChannelList
                onSelect={(channel) => {
                    setChannel(channel);
                    navigation.navigate('main');
                }} 
            />
            <DrawerItem
                label="Sign out"
                labelStyle={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: 'white'
                }}
                style={{backgroundColor: '#121212'}}
                onPress={signOutUser}
            />

        </View>
    )
}

export default DrawerNavigation