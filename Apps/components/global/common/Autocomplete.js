import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

const AutoComplete = ({
  data,
  value,
  onChange,
  onSelect,
  placeholder,
  touched,
  error,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const validationColor = !touched ? "#223e4b" : error ? "#FF5A5F" : "#223e4b";

  const handleFilter = (text) => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
    setShowDropdown(true);
    onChange(text);
  };

  return (
    <View style={{ padding: 0, width: "100%" }}>
      <Text
        style={{
          fontSize: 14,
          color: "#2D2D2A",
          marginLeft: 4,
          fontWeight: "500",
        }}
      >
        Select Country
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            height: 40,
            borderColor: validationColor,
            borderWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleFilter}
          onFocus={() => setShowDropdown(true)}
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            marginTop: 0,
            marginBottom: 0,
          }}
        />
        <AntDesign name="down" size={18} color="gray" />
      </View>

      {showDropdown && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={[{ backgroundColor: "white" }]}
        >
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setShowDropdown(false);
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 0.8,
                  borderBottomColor: "#ccc",
                  backgroundColor: "#fff",
                  marginBottom: 5,
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={{
              maxHeight: 150,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingRight: 8,
    paddingLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#E7E9E2",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
});

export default AutoComplete;
