import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer'
import MainScreen from '../screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { STREAMCHAT_KEY } from '@env';
import { auth } from '../../firebaseConfig';
import useChatClient from '../hooks/useChatClient';
import { StreamChat } from 'stream-chat';
import {
    OverlayProvider,
    Chat,
    ChannelList
  } from 'stream-chat-expo'; // Or stream-chat-expo

  const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

const DrawerStack = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
        
            <OverlayProvider>
                <Chat client={chatClient}>
                    <DrawerStack.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                        <DrawerStack.Screen name="main" component={MainScreen}/>
                    </DrawerStack.Navigator>
                </Chat>
            </OverlayProvider>
        
        
        
    </NavigationContainer>  
  )
}

const CustomDrawerContent = (props) => {
    const { clientIsReady } = useChatClient();

    if (!clientIsReady) {
      return <Text className='mt-10 text-center font-bold text-2xl'>Loading chat ...</Text>
    }

    return (
        <SafeAreaView {...props} className='bg-gray-700 flex-1'>
            <View>
                <View>
                    <TouchableOpacity className='rounded-full p-4 bg-black self-center'>
                        <Ionicons name="chatbox-sharp" size={30} color="white" />
                    </TouchableOpacity>
                    <ChannelList />
                    <TouchableOpacity className='rounded-full p-4 bg-black self-center'>
                        <AntDesign name="plus" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity className='rounded-full p-4 bg-black self-center'>
                        <Entypo name="flow-tree" size={30} color="green" />
                    </TouchableOpacity>
                    
                    
                </View>
            </View>
            {/** <DrawerItemList {...props}/>*/}
            
        </SafeAreaView>
    )
}

export default DrawerNavigation