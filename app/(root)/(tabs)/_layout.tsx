import { Tabs } from "expo-router";
import { View,Image, ImageSourcePropType } from "react-native";
import { icons } from "../../../constants"


const TabIcon =({source,focused}:{source:ImageSourcePropType;
  focused:boolean;
})=>(
  <View  className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
  >

<View  className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}>
      <Image source={source} tintColor = "black" resizeMode="contain" className="w-7 h-7"/>
    </View>
  </View>

)
const Layout =() => 
      (
        <Tabs initialRouteName="home" screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor:"white",
          tabBarShowLabel:false,
          tabBarStyle:{
            backgroundColor:"#fcf8",
            borderRadius:50,
            paddingBottom:35,
            overflow:"hidden",
            marginHorizontal:20,
            marginBottom:20,
            height:78,
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            flexDirection:"row",
            position:"absolute",
          }
          }}>

        <Tabs.Screen name="home"
        options = {{
          title:'Главная',
          headerShown:false,
          tabBarIcon:({focused})=> 
            <TabIcon focused = {focused} source={icons.home}/>
        }}/>

<Tabs.Screen name="rides"
        options = {{
          title:'Полеты',
          headerShown:false,
          tabBarIcon:({focused})=> 
            <TabIcon focused = {focused} source={icons.list}/>
        }}/>

<Tabs.Screen name="chat"
        options = {{
          title:'Чат',
          headerShown:false,
          tabBarIcon:({focused})=> 
            <TabIcon focused = {focused} source={icons.chat}/>
        }}/>

<Tabs.Screen name="profile"
        options = {{
          title:'Профиль',
          headerShown:false,
          tabBarIcon:({focused})=> 
            <TabIcon focused = {focused} source={icons.profile}/>
        }}/>


        </Tabs>
  );

export default Layout;