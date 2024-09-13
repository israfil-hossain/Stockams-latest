import React, { useState } from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SearchBar from "../../components/global/common/SearchBar";
import TicketCreation from "../../components/support_ticket/TicketCreate";
import { useGet, useUpdate } from "../../hooks";
import { API } from "../../../api/endpoints";
import { useAuthUserContext } from "../../context/AuthUserProvider";
import CommonLoader from "../../components/global/progress/CommonLoader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import usePatch from "../../hooks/usePatchUpdate";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/global/common/ui/Button";
import { Dimensions } from "react-native";
import SingleMessageView from "../../components/host_rental_panel/chat/MessageView";

const MessageScreen = () => {
  const { width, height } = Dimensions.get("window");
  const [searchQuery, setSearchQuery] = useState("");
  const [supportStatus, setSupportStatus] = useState("OPEN");
  const { userData } = useAuthUserContext();
  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const {
    data: { data: allticket = {} } = {},
    isLoading: ticketLoading,
    refetch,
  } = useGet({
    endpoint: `${
      API.GetAllTicket
    }?Page=${1}&PageSize=${100}&TitleSearch=${searchQuery}&SupportStatus=${supportStatus}&SupportUserId=${
      userData?._id
    }`,
  });

  const { mutateAsync: closeMutation, isLoading: ticketCloseLoading } =
    usePatch({
      isMultiPart: false,
      endpoint: API.UpdateTicketById + id,
    });

  const handleSubmit = async () => {
    try {
      if (id) {
        const payload = {
          status: "CLOSED",
        };
        const response = await closeMutation(payload);
        if (response) {
          toast.show("Your Ticket is Closed 👋", { type: "success" });
          refetch();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
  };

  const openTickets =
    allticket &&
    allticket?.data?.filter((ticket) => ticket.supportStatus === "OPEN");

  return (
    <SafeAreaView
      className="flex flex-col justify-center items-center"
      style={{ width: width }}
    >
      {isMessageOpen ? (
        <SingleMessageView
          id={id}
          setIsMessageOpen={setIsMessageOpen}
          searchQuery={searchQuery}
        />
      ) : (
        <>
          <View className="mt-5 mx-5">
            <SearchBar onSearch={handleSearch} text="Search " />
          </View>

          <View
            className="mt-3 mb-3 flex flex-row justify-between  items-center "
            style={{ width: width }}
          >
            <View className="w-[120px] ml-3">
              <CustomButton
                text="Create Ticket"
                size={"100%"}
                height={40}
                bg={Colors.primary}
                onPress={() => setIsOpen(true)}
              />
            </View>
            <View className="mr-3 w-[200px] h-[40px] items-center flex flex-row justify-center border border-[#ccc] rounded-md px-2">
              <Text className="text-gray-400">Ticket</Text>
              <View className="w-[150px]">
                <Picker
                  selectedValue={supportStatus}
                  style={{ height: 40, width: "100%", fontSize: 10 }}
                  onValueChange={(itemValue) => setSupportStatus(itemValue)}
                >
                  <Picker.Item label="OPEN" value="OPEN" />
                  <Picker.Item label="CLOSED" value="CLOSED" />
                </Picker>
              </View>
            </View>
          </View>
          {openTickets?.length <= 0 || isOpen ? (
            <View className="w-[100%] items-center flex flex-row justify-center my-5">
              <TicketCreation setIsOpen={setIsOpen} />
            </View>
          ) : (
            <>
              {ticketLoading ? (
                <CommonLoader />
              ) : (
                <FlatList
                  style={{ width: width - width * 0.1 }}
                  data={allticket?.data}
                  key={allticket?.data?._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className={`flex flex-row p-3 w-[100%] mt-2 h-[75px]  justify-between border shadow-md border-[#ccc] rounded-md `}
                      onPress={ async () => {
                        await setId(item?._id);
                        setIsMessageOpen(true);
                      }}
                    >
                      <View className="flex flex-row justify-start space-x-2 w-[65%]">
                        <View className=" rounded-full bg-[#ebeaea] items-center flex flex-col justify-center w-[50px] h-[50px]">
                          <Ionicons name="ticket" size={24} color="black" />
                        </View>

                        <View className="flex flex-col justify-between w-[80%]">
                          <Text className="text-[17px] font-medium ">
                            {item.title}
                          </Text>
                          {/* <Text className="text-[#ABB0B6] text-[13px]">9:41 am</Text> */}

                          <Text className="text-[#ABB0B6] ">
                            {item.description}
                          </Text>
                        </View>
                      </View>

                      <CustomButton
                        showIcon={true}
                        size={65}
                        height={40}
                        icon={"close"}
                        bg={Colors.danger}
                        isLoading={ticketCloseLoading}
                        onPress={() => {
                          setId(item?._id);
                          handleSubmit();
                        }}
                        disabled={ticketCloseLoading}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default MessageScreen;
