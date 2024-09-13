import { Image,View } from 'react-native'
import React from 'react'
import { Loader } from '../../../../assets/images'
import { StatusBar } from 'expo-status-bar'


const CommonProgress = () => {
  return (
    <View className='h-full items-center flex flex-col justify-center'>
      <StatusBar style="dark" />
      <View className="w-60 h-48 justify-center items-center p-5 rounded-xl bg-white">
        <Image
          className="w-24 h-24"
          source={Loader}
        />
      </View>
    </View>
  )
}

export default CommonProgress
