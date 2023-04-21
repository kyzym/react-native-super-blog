import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./MapScreenStyles";

const MapScreen = ({ route }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  });

  useEffect(() => {
    setCoordinate({
      latitude: route.params.latitude,
      longitude: route.params.longitude,
    });
  }, [route.params.latitude, route.params.longitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
      >
        <Marker
          title="I am here"
          coordinate={coordinate}
          description="My location"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
