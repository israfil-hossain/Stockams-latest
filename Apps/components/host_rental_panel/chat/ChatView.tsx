import React, { useState, useEffect } from "react";

import { Text, View, FlatList, Image } from "react-native";
import { favourite, next } from "@/assets/images";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";

import SearchBar from "@/components/global/common/SearchBar";


const ChatView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const router = useRouter();

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Jenny Wilson",
      lastMassage: " Wanna See the room or want to meet",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBRdmz3LadjgP_7giopi8RU6TJQgE-9IZaYXSJYWHuFv3ty1vbrgMiiU6XqdhxXyFqJqU&usqp=CAU",
    },
    {
      id: "2",
      name: "Dianne Russell",
      lastMassage: " Wanna See the room or want to meet",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU",
    },
    {
      id: "3",
      name: "Ralph Edwards",
      lastMassage: " Wanna See the room or want to meet",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_P-q6NHBvJE07jKBmpMxCtJV1OoWjIsGLig&usqp=CAU",
    },
    // Add more users as needed
  ]);

  interface SearchResultItem {
    id: number;
    name: string;
    lastMassage: string;
    description: string;
    image: string;
  }

  //   useEffect(() => {
  //     // Simulating an asynchronous API call
  //     const fetchData = async () => {
  //       // Replace this with your actual API call
  //       // For now, let's simulate some search results
  //     //   const results: SearchResultItem[] = [
  //     //     { id: 1, name: "Result 1", description: "Description for Result 1" },
  //     //     { id: 2, name: "Result 2", description: "Description for Result 2" },
  //     //     { id: 3, name: "Result 3", description: "Description for Result 3" },
  //     //     // Add more items as needed
  //     //   ];

  //       setSearchResults(results);
  //     };

  //     fetchData();
  //   }, [searchQuery]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  return (
    <View className="w-full h-full bg-white">
      <View className="mt-[10px]">
        <SearchBar onSearch={handleSearch} text="Search for a store" />
        {/* {searchResults.map((result) => (
        <View key={result.id}>
          <Text>{result.name}</Text>
          <Text>{result.description}</Text>
        </View>
      ))} */}
        <ScrollView>
          
          {users?.map((item, id) => (
            <TouchableOpacity onPress={()=>{router.push({pathname:"/(main)/(home)/(modals)/massagePage",params:{id:id, image: item.image, name: item.name}})}} key={id} >
              <View className="flex flex-row p-3 mt-2 w-96 h-[75px]  justify-between" >
                <Image
                  className="w-[50px] h-[50px] rounded-3xl"
                  source={{ uri: item.image }}
                />
                <View className="flex flex-col justify-between">
                  <View className="flex flex-row justify-between">
                    <Text className="text-[17px] font-medium right-[55px]">
                      {item.name}
                    </Text>
                    <Text className="text-[#ABB0B6] text-[13px]">9:41 am</Text>
                  </View>
                  <Text className="text-[#ABB0B6] right-[55px]">
                    {item.lastMassage}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ChatView;
