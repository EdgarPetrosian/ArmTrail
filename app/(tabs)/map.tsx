import { StyleSheet } from 'react-native';

import Mapbox, { Camera, Images, LocationPuck, MapView, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

import { featureCollection, point } from '@turf/helpers';
import tree from '../../assets/images/forest.png';
import trees from '../../data/trees.json';

export default function TabThreeScreen() {

  const points = trees.map(tree => point([tree.longitude, tree.latitude]))

  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/standard-satellite'>
      <Camera followZoomLevel={15} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{ isEnabled: true }} />
      <ShapeSource id="trees" shape={featureCollection(points)} >
        <SymbolLayer
          id="tree-icons"
          style={{
            iconImage: 'tree',
            iconSize: 0.1,
            iconAllowOverlap: true,
          }}
          
        />
        <Images images={{ tree }} />
      </ShapeSource>
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
