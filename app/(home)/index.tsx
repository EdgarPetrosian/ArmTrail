import MainBottomSheet from "@/components/MainBottomSheet";
// import { supabase } from "@/lib/supabase";
// import { Button } from '@rneui/themed';
import { Stack } from "expo-router";
import Map from "../../components/Map";

export default function Home() {
    return (
        <>
            <Stack.Screen options={{ title: 'Home', headerShown: false }} />
            <Map />
            {/* <Button
                buttonStyle={{
                    backgroundColor: '#42E100',
                }}
                title="Sign Out" onPress={() => supabase.auth.signOut()} /> */}
            <MainBottomSheet />
        </>
    )

};