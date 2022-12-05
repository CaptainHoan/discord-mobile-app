import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const LoginScreen = () => {
  return (
    <SafeAreaView className='bg-gray-700 flex-1'>
        <View className='mt-10 items-center justify-center mb-8'>
            <Text className='text-2xl font-bold text-white mb-3'>Welcome back</Text>
            <Text className='text-md font-bold text-gray-400'>We're so excited to see you again!</Text>
        </View>
        <View className='mx-5'>
            <Text className='text-md text-gray-300 font-extrabold mb-2'>ACCOUNT INFORMATION</Text>
            <LoginForm />
        </View>
      
    </SafeAreaView>
  )
}

const LoginForm = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <View>
            <View style={{
                backgroundColor: 'black',
                padding: 15,
                borderRadius: 8,
                marginBottom: 10
            }}>
                <TextInput 
                    placeholder='Email'
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={value => setEmail(value)}
                    style={{
                        color: 'white',
                        fontSize: 18
                    }}
                />
            </View>

            <View style={{
                backgroundColor: 'black',
                padding: 15,
                borderRadius: 8
            }}>
                <TextInput 
                    placeholder='Password'
                    placeholderTextColor={'gray'}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    style={{
                        color: 'white',
                        fontSize: 18
                    }}
                />
            </View>
            <TouchableOpacity className='mt-4 mb-6'>
                <Text className='text-sm text-blue-300'>forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity className='bg-blue-400 p-3 rounded-md '>
                <Text className='text-white font-bold text-lg text-center '>Log In</Text>
            </TouchableOpacity>
            
            
        </View>
    )
}

export default LoginScreen