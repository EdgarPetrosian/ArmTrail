import { StyleSheet } from 'react-native';

import Mapbox, { Camera, CircleLayer, Images, LocationPuck, MapView, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

import { featureCollection, point } from '@turf/helpers';
import tree from '../../assets/images/forest.png';
import trees from '../../data/trees.json';

export default function TabThreeScreen() {

  const points = trees.map(tree => point([tree.longitude, tree.latitude]))

  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/dark-v11'>
      <Camera followZoomLevel={10} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{ isEnabled: true }} />
      <ShapeSource id="trees" cluster shape={featureCollection(points)} >
        <SymbolLayer
          id="clusters-count"
          style={{
            textField: ['get', 'point_count'],
          }}
        />
        <CircleLayer
          id='clusters'
          belowLayerID='clusters-count'
          filter={['has', 'point_count']}
          style={{
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white'
          }} />
        <SymbolLayer
          id="tree-icons"
          filter={['!', ['has', 'point_count']]}
          style={{
            iconImage: 'tree',
            iconSize: 0.1,
            iconAllowOverlap: true,
            iconAnchor: 'bottom',
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
