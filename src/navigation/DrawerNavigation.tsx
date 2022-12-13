import { Text, NativeMethods, View  } from 'react-native'
import React, { useState } from 'react'
import { 
    createDrawerNavigator, 
    DrawerItem, 
    DrawerNavigationProp} from '@react-navigation/drawer'
import MainScreen, { height } from '../screens/MainScreen';
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
import CreateChannel from '../components/CreateChannel';

const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

type DrawerParamsType = {
    main: undefined
}

type drawerNavigationPropsType = DrawerNavigationProp<DrawerParamsType, 'main'>

const DrawerStack = createDrawerNavigator<DrawerParamsType>();

const DrawerNavigation = () => {

    const theme: DeepPartial<Theme> = {
        colors: Colors,
        inlineDateSeparator: {
            text: {
                color: 'white'
            }
        },
        messageSimple: {
            content: {
                containerInner: {
                    backgroundColor: '#F47373'
                }
            },
        },
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

    if (clientIsReady) {
      return (
        <View style={{backgroundColor: '#121212', flex: 1, paddingTop: height / 2}}>
            <Text className=' text-center font-bold text-2xl text-white'>Loading chat ...</Text>
        </View>
      )
      
    }

    //press to sign out user using Firebase auth
    const signOutUser = async() => {
        await signOut(auth)
        .then (() => {
            //signOut user
        })
        .catch(err => console.log(err.message))
    }

    //configure dialog to create new channel
    const [dialogVisible, setDialogVisible] = useState<boolean>(false)

    
    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const [newChannel, setNewChannel] = useState<string>('')
    const [channelImg, setChannelImg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png')

    return (
        <View {...props} className='flex-1 pt-3' style={{backgroundColor: '#121212'}}>
            <ChannelList
                onSelect={(channel) => {
                    setChannel(channel);
                    navigation.navigate('main');
                }} 
            />
            <DrawerItem
                label="create channel"
                labelStyle={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: 'white'
                }}
                style={{backgroundColor: '#121212'}}
                onPress={showDialog}
            />
            <CreateChannel 
                dialogVisible={dialogVisible}
                showDialog={showDialog}
                handleCancel={handleCancel}
                setDialogVisible={setDialogVisible}
                newChannel={newChannel}
                setNewChannel = {setNewChannel}
                channelImg={channelImg}
                setChannelImg={setChannelImg}
            />
            <DrawerItem
                label="Sign out"
                labelStyle={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: 'red',
                }}
                style={{backgroundColor: '#121212'}}
                onPress={signOutUser}
            />

        </View>
    )
}

export default DrawerNavigation