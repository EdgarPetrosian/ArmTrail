import tree from '@/assets/images/forest.png';
// import trees from '@/data/trees.json';
import { useTree } from "@/providers/TreesProvider";
import { CircleLayer, Images, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { featureCollection, point } from '@turf/helpers';

export default function TreeMarkers({ modalPress }) {
    const { setSelectedTree, nearbyPlants } = useTree();

    const points = nearbyPlants.map(treeData => point([treeData.longitude, treeData.latitude], { treeData }));

    const onPointPress = async (event: OnPressEvent) => {
        if (event.features[0].properties?.treeData) {
            setSelectedTree(event.features[0].properties.treeData);
            modalPress(event.features[0].properties.treeData);
        }
    };
    return (
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
    )
}