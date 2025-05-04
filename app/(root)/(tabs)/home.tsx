import { View,Text } from "react-native"
import { SignedIn,SignedOut,useUser } from "@clerk/clerk-expo";
const Home = () =>{
    const {user} = useUser();
    return (
        <View>
            <Text>Hello popytka krainyaa</Text>
            <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </View>
    )
};
export default Home;