import { STREAMCHAT_KEY } from '@env';
import React, { useEffect, useLayoutEffect, useState } from 'react'
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
                name: 'captainhoan'
              },
              chatClient.devToken('captainhoan')
            )
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