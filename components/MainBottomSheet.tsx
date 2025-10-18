import noImage from '@/assets/images/no-image-icon.png';
import { formatDistance, formatDuration } from '@/helpers/functions';
import { useTree } from '@/providers/TreesProvider';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import TreeMarkers from './TreeMarkers';

const MainBottomSheet = () => {
  const [markerInfo, setMarkerInfo] = useState<TreesInformationTypes>();
  const { routDuration, routDistance } = useTree();
  const [error, setError] = useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback((treeData) => {
    setMarkerInfo(treeData)
    setError(false)
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
  }, []);

  const duration = formatDuration(routDuration);
  const distance = formatDistance(routDistance);

  // renders
  return (
    <View style={styles.contentContainer}>
      <TreeMarkers modalPress={handlePresentModalPress} />
      <BottomSheetModal
        handleStyle={styles.modalHandleStyle}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.sheetContainer}>
          <View style={styles.contentContainer}>
            <Image
              style={styles.stretch}
              source={
                error || !markerInfo?.image_url
                  ? noImage
                  : { uri: markerInfo.image_url }
              }
              onError={() => {
                setError(true);
              }}
              resizeMode="contain"
            />
            <ScrollView style={styles.descriptionContainer}>
              <Text style={styles.descriptionStyle}>{markerInfo?.description}</Text>
              <View style={styles.flexRow}>
                <FontAwesome5 name="walking" size={12} color="#42E100" />
                <Text style={styles.durationStyle}>{` Wolking Duration - ${duration}`}</Text>
              </View>
              <View style={styles.flexRow}>
                <MaterialCommunityIcons name="map-marker-distance" size={12} color="#42E100" />
                <Text style={styles.durationStyle}>{` Distance - ${distance}`}</Text>
              </View>
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalHandleStyle: {
    backgroundColor: '#d1cdcd',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: '#d1cdcd',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  stretch: {
    width: '40%',
    height: 100,
    resizeMode: 'contain',
  },
  descriptionContainer: {
    width: '50%',
    paddingHorizontal: 10
  },
  descriptionStyle: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  durationStyle: {
    fontSize: 12,
  },
  flexRow: {
    flexDirection: 'row',
  },
  bottomContainer: {
    backgroundColor: '#42E100',
    margin: 25,
    borderRadius: 20
  }
});

export default MainBottomSheet;