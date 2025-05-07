import { View,Text } from "react-native"
import { SignedIn,SignedOut,useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () =>{
    const {user} = useUser();
    return (
        <SafeAreaView>
            <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </SafeAreaView>
    )
};
export default Home;