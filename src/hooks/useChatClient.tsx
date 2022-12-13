import { STREAMCHAT_KEY } from '@env';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';
import { auth } from '../../firebaseConfig';

const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

const useChatClient = () => {
    const [clientIsReady, setClientIsReady] = useState<boolean>(false)

    const user = auth.currentUser
    
    useEffect(() => {
      if (user) {
          const setupClient = async () => {
          try {
            chatClient.connectUser(
              {
                id: 'captainhoan',
                name: 'captainhoan',
                image: 'https://image.cnbcfm.com/api/v1/image/104891709-Bill_Gates_the_co-Founder.jpg?v=1558120888'
              },
              chatClient.devToken('captainhoan')
            )
            //setClientIsReady(true)
            //const channel = chatClient.channel(
              //'team',
             //'ethernity',
             // {name: 'Ethernity'}
           // )

            //await channel.create()
          } catch(error) {
            console.log(error)
          }
        }
        if (!chatClient.userID) {
          setupClient();
        }
      }     
    }, [])
    
  return (
    {clientIsReady}
  )
}

export default useChatClient