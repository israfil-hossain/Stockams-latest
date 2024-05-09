import React, { FC, useState, useEffect, useCallback } from "react";
import { Text, View, PermissionsAndroid, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "react-native-geolocation-service";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";



const Location = ({
  values,
  onLocationChange,
}) => {
  const [currentLocation, setCurrentLocation] =
    useState<Geolocation.GeoPosition | null>(null);
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
    const [mapRegion, setMapRegion] = useState({
      latitude: 24.842865,
      longitude: 67.044405,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        setHasLocationPermission(
          granted === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        setHasLocationPermission(true); // Assume granted for iOS
      }
    };

    checkPermissions();
  }, []);

  const requestLocation = useCallback(async () => {
    try {
      const position = await Geolocation?.getCurrentPosition(
        (pos) => {
          setCurrentLocation(pos);
        },
        (error) => {
          setError(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      console.log({ position });
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (hasLocationPermission) {
      requestLocation();
    }
  }, [hasLocationPermission, requestLocation]);

  const handleLocationSelection = (data, details) => {
    onLocationChange(data?.description); // Call the callback
    const { latitude, longitude } = details?.geometry?.location;
    if (latitude && longitude) {
      setMapRegion({ ...mapRegion, latitude, longitude }); // Update map region
    }
  };

  return (
    <View className="h-full relative ">
      <View className=" px-2  w-[320px] absolute top-0 z-10 ">
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          minLength={2}
          onFail={(err) => console.error(err)}
          fetchDetails={true}
          listViewDisplayed={false}
          keepResultsAfterBlur={true}
          onPress={(data, details = null) =>{
            handleLocationSelection(data, details)
          }  
          } // Corrected onPress prop
          query={{
            key: "AIzaSyDHoL8v4KmgOnN0ZQ9L8jR93EbhzS1u-Us", // Replace with your API key
            language: "en",
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "white",
              marginBottom: 5,
              borderRadius:10,
            },
            textInput: {
              height: 38,
              color: "#3A3A3A",
              fontSize: 16,
              borderRadius: 10,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
      </View>

      {/* <View className="h-full mt-[55px] rounded-lg ">
          <MapView
            style={{
              width: "100%",
              height: "90%",
              marginTop: 10,
              borderRadius: 10,
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={mapRegion}
          >
            {currentLocation && ( // Conditionally render marker based on current location
              <Marker
                coordinate={{
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude,
                }}
                title="Your Location"
              />
            )}
          </MapView>
        </View> */}
    </View>
  );
};

export default Location;
