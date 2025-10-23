import { supabase } from "@/lib/supabase";
import { getDirections } from "@/services/directions";
import * as Location from 'expo-location';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export default function TreeProvider({ children }: PropsWithChildren) {
    const [selectedTree, setSelectedTree] = useState(null);
    const [direction, setDirection] = useState();
    const [isNearby, setIsNearby] = useState(false);
    const [nearbyPlants, setNearbyPlants] = useState<any[]>([]);

    useEffect(() => {
        const fetchPants = async () => {
            const location = await Location.getCurrentPositionAsync();
            const { error, data } = await supabase.rpc('nearby_plants', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                max_dist_meters: 2000,
            });
            if (error) {
                Alert.alert('Failed to fetch plants')
            } else {
                // console.log('data', JSON.stringify(data, null, 2))
                setNearbyPlants(data);
            }
        };
        fetchPants();
    }, [])

    useEffect(() => {
        const fetchDirections = async () => {
            const myLocation = await Location.getCurrentPositionAsync({});
            const route = await getDirections(
                [myLocation.coords.longitude, myLocation.coords.latitude],
                [selectedTree?.longitude, selectedTree?.latitude]
            );
            setDirection(route);
        }

        if (selectedTree) {
            fetchDirections();
            setIsNearby(false);
        } else {
            setDirection(undefined);
            setIsNearby(false);
        }
    }, [selectedTree])

    return (
        <TreeContext.Provider
            value={{
                nearbyPlants,
                selectedTree,
                setSelectedTree,
                direction,
                directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
                routDuration: direction?.routes?.[0]?.duration,
                routDistance: direction?.routes?.[0]?.distance,
                isNearby
            }}>
            {children}
        </TreeContext.Provider>
    );
}

export const useTree = () => useContext(TreeContext);