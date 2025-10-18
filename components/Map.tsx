import React from 'react';
import { StyleSheet } from 'react-native';

import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

import LineRoute from '@/components/LineRoute';
import MainBottomSheet from '@/components/MainBottomSheet';
import { useTree } from '@/providers/TreesProvider';

export default function TabThreeScreen() {
  const { directionCoordinates } = useTree();

  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/dark-v11'>
      <Camera followZoomLevel={15} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{ isEnabled: true }} />
      <MainBottomSheet />
      {directionCoordinates && (
        <LineRoute coordinates={directionCoordinates} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
});
