import React, { createContext, useContext, useState } from 'react'

export const ChatContext = createContext({
    channel: null, 
    setChannel: (channel) => {},
})

export const ChatProvider = ({children}) => {
    const [channel, setChannel] = useState(null);

    return <ChatContext.Provider value={{channel, setChannel}}>{children}</ChatContext.Provider>
}

export const useChatContext = () => useContext(ChatContext)