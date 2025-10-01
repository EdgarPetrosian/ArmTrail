import React from 'react';
import { StyleSheet } from 'react-native';

import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

import LineRoute from '@/components/LineRoute';
import TreeMarkers from '@/components/TreeMarkers';
import { useTree } from '@/providers/TreesProvider';

export default function TabThreeScreen() {
  const { directionCoordinates } = useTree();

  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/dark-v11'>
      <Camera followZoomLevel={15} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{ isEnabled: true }} />
      <TreeMarkers />
      {directionCoordinates && (
        <LineRoute coordinates={directionCoordinates} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
