// Define an interface for component props
interface MyComponentProps {
    title: string;
    count?: number; // Optional prop
    onPress: (id: string) => void;
}

// Define a type for component state
type MyComponentState = {
    isLoading: boolean;
    data: string[];
};

type Status = "idle" | "loading" | "success" | "error";

enum UserStatus {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending',
}

type TreesInformationTypes = {
    id: number;
    name: string;
    description: string;
    location: string;
    latitude: number;
    longitude: number;
    image_url: string;
}