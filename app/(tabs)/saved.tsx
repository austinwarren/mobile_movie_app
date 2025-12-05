import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const saved = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
          <View className='flex justify-center items-center flex-1 flex-col gap-5'>
            <Image source={icons.save} className='size-10' tintColor="#Fff" />
            <Text className="text-gray-500 text-base">Save</Text>
          </View>
        </View>
  )
}

export default saved


//save your favorite movies into a collection. Work w/ appwrite to have persistent storage, very similar to tracking our metrics right now
//function: instead of searches, track clicks when someone clicks a heart on a movie

//second function to fetch all of the favorited movies