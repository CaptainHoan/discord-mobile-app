import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Dialog from "react-native-dialog";
import { StreamChat } from 'stream-chat';
import { STREAMCHAT_KEY } from '@env';
import * as ImagePicker from 'expo-image-picker';

const chatClient = StreamChat.getInstance(STREAMCHAT_KEY)

type DialogPropsTypes = {
    dialogVisible: boolean,
    showDialog: () => void,
    handleCancel: () => void,
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    newChannel: string,
    setNewChannel: React.Dispatch<React.SetStateAction<string>>
    channelImg: string,
    setChannelImg: React.Dispatch<React.SetStateAction<string>>
}

const CreateChannel = ({
    dialogVisible, 
    showDialog, 
    handleCancel, 
    setDialogVisible,
    newChannel,
    setNewChannel,
    channelImg,
    setChannelImg
  }: DialogPropsTypes) => {

  const createNewChannel = async() => {
    try {
      const new_channel = chatClient.channel(
      'team',
      newChannel,
      {
        name: newChannel,
        image: channelImg
      }
    )
    await new_channel.create()
    await new_channel.addMembers(['captainhoan', 'nickrose'])
    setDialogVisible(false)
    } catch(err) {
      console.log(err)
    }
  }

  //pick Image from your phone

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setChannelImg(result.uri);
    }
  };


  return (
    <>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>New channel</Dialog.Title>
        <Dialog.Description>
            Enter your channel to start chatting with your friends
        </Dialog.Description>
        <Dialog.Input 
          value={newChannel}
          onChangeText={value => setNewChannel(value)}
        />
        <Text className='mb-2 text-center'>Choose your channel's avatar</Text> 
        <TouchableOpacity 
          onPress={pickImage}
          className='rounded-full p-3 self-center mb-2' style={{borderWidth: 1, borderColor: 'red'}}>
          <Image
            style={{width: 50, height: 50, resizeMode: 'contain'}} 
            source={{uri: channelImg}}
          />
        </TouchableOpacity>
        <Dialog.Button label="Cancel" onPress={handleCancel}/>
        <Dialog.Button label="OK" onPress={createNewChannel}/>   
      </Dialog.Container>
    </>
  )
}

export default CreateChannel