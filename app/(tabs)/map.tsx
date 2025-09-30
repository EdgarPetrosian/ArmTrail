import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Mapbox, { Camera, CircleLayer, Images, LineLayer, LocationPuck, MapView, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { featureCollection, point } from '@turf/helpers';
import * as Location from 'expo-location';
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

import tree from '@/assets/images/forest.png';
import trees from '@/data/trees.json';
import { getDirections } from '@/services/directions';

export default function TabThreeScreen() {
  const [rout, setRoute] = useState();
  const points = trees.map(tree => point([tree.longitude, tree.latitude]));
  const directionCoordinate = rout?.routes?.[0]?.geometry?.coordinates;

  const onPointPress = async (event: OnPressEvent) => {
    const location = await Location.getCurrentPositionAsync({});

    const route = await getDirections(
      [location.coords.longitude, location.coords.latitude],
      [event.coordinates.longitude, event.coordinates.latitude]
    );
    setRoute(route);
  }

  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/dark-v11'>
      <Camera followZoomLevel={15} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{ isEnabled: true }} />
      <ShapeSource id="trees" cluster shape={featureCollection(points)}
        onPress={onPointPress}>
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
      {directionCoordinate && (
        <ShapeSource
          id="routeSource"
          lineMetrics
          shape={{
            properties: {},
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: directionCoordinate,
            },
          }}>
          <LineLayer
            id="exampleLineLayer"
            style={{
              lineColor: '#42A2D9',
              lineCap: 'round',
              lineJoin: 'round',
              lineWidth: 7,
              lineDasharray: [1, 1]
            }}
          />
        </ShapeSource>
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
