import { FontAwesome5 } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';

interface CustomDropDownProps {
  title: string;
  data: { title: string }[];
  height?: number;
  marginTop?: number;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({ title, data, height,marginTop }) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [filteredData, setFilteredData] =useState<{ title: string }[]>(data);
  const [selectedSpace, setSelectedSpace] = useState('');

  const onSearch = (searchText: string) => {
    if (searchText !== '') {
      let tempData = data.filter((item) => {
        return item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <View style={{}}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: height ? height : 50,
          borderRadius: 15,
          backgroundColor: '#E7E9E2',
          alignSelf: 'center',
          marginTop: marginTop ? marginTop :10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{ fontWeight: '600' }}>{selectedSpace === '' ? title : selectedSpace}</Text>
        {clicked ? (
          <FontAwesome5 name="angle-up" size={20} color="black" />
        ) : (
          <FontAwesome5 name="angle-down" size={20} color="black" />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 10,
            height: 300,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Search.."
            value={search}
            onChangeText={(txt) => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          />
          <View>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}
              data={filteredData}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '85%',
                      alignSelf: 'center',
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                      borderColor: '#8e8e8e',
                    }}
                    onPress={() => {
                      setSelectedSpace(title);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{ fontWeight: '600' }}>{title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CustomDropDown;