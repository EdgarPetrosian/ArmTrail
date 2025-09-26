import { StyleSheet } from 'react-native';

import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');
export default function TabThreeScreen() {
  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/standard-satellite'>
      <Camera followZoomLevel={15} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{ isEnabled: true }} />
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
