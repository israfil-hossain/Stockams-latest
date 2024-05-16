import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, FC } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';// Replace 'your-icon-library' with the actual library you're using for icons

const SearchBar = ({text,updateFilters}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeText = (newText) => {
    setSearchQuery(newText);
    updateFilters({ Name: newText }); 
    // onSearch(newText);
  };

  return (
    <View className='flex flex-row items-center justify-between w-[90%] h-[50px] bg-[#ffffff] self-center rounded-xl p-2 shadow-xl shadow-slate-500'>
    <EvilIcons name="search" size={25} color="#ABB0B6" />
      <TextInput className='text-[13px] py-2 px-2 w-full  mt-[3px] '
        placeholder={text}
        value={searchQuery}
        onChangeText={handleChangeText}
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"
        autoCapitalize="none"
        keyboardAppearance="dark"
        returnKeyType="go"
        returnKeyLabel="go"
      />
      <TouchableOpacity className='' onPress={() => updateFilters({})}>
        <MaterialIcons name="clear" size={20} color="#ABB0B6" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
