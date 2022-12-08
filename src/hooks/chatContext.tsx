import React, { createContext, useState } from 'react'

export const ChatContext = createContext({
    channel: null, 
    setChannel: (channel) => {},
    thread: null,
    setThread: (thread) => {},
})

export const chatProvider = ({children}) => {
    const [channel, setChannel] = useState();
    const [thread, setThread] = useState();

    return <ChatContext.Provider value={{channel, setChannel, thread, setThread}}>{children}</ChatContext.Provider>
}