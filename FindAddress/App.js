import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Dimensions, Alert, Keyboard } from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [street, setStreet] = useState(null);
  const [latLng, setLatLng] = useState({latitude:99999,longitude:99999});

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify(location));
      console.log(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta:0.0322,
        longitudeDelta:0.0221,
      })
      setLatLng({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }
  };

  const fetchCoordinates = () => {
    Keyboard.dismiss();
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=Mux5EQRCISGhlR3KaGgnjhAYjxux9SW9&location=' + street;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setMapRegion({
        latitude: data.results[0].locations[0].latLng.lat,
        longitude: data.results[0].locations[0].latLng.lng,
        latitudeDelta:0.0322,
        longitudeDelta:0.0221,
      })
      setLatLng({
        latitude: data.results[0].locations[0].latLng.lat,
        longitude: data.results[0].locations[0].latLng.lng,
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
     <MapView
        style={{
          flex:1,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width }}
          region={mapRegion}
    >
        <Marker
          coordinate={{latitude: latLng.latitude, longitude: latLng.longitude}}
        />
      </MapView>
        <TextInput
          style={{width: Dimensions.get('window').width, borderBottomColor: 'gray', borderBottomWidth: 1}}
          onChangeText={text => setStreet(text)}
          value={street}
      />
      <Button title="Find" onPress={fetchCoordinates} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
