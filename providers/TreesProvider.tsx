import { getDirections } from "@/services/directions";
import * as Location from "expo-location";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const TreeContext = createContext({});

export default function TreeProvider({ children }: PropsWithChildren) {
    const [selectedTree, setSelectedTree] = useState();
    const [direction, setDirection] = useState();
    const [isNearby, setIsNearby] = useState(false);

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
            fetchDirections()
        }
    }, [selectedTree])

    return (
        <TreeContext.Provider
            value={{
                selectedTree,
                setSelectedTree,
                direction,
                directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
                routDuration: direction?.routes?.[0]?.duration,
                routDistance: direction?.routes?.[0]?.distance,
            }}>
            {children}
        </TreeContext.Provider>
    );
}

export const useTree = () => useContext(TreeContext);