import { View, Text } from 'react-native'
import React from 'react'

export type RootParamsType = {
  main: {
    channel: {}
  }
}


const RootNavigation = () => {
  return (
    <View >
      <Text className='text-red-600'>RootNavigation</Text>
    </View>
  )
}

export default RootNavigation