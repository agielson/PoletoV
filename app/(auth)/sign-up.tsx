import { View,Text,ScrollView,Image } from "react-native"
import {images,icons} from "../../constants"
import { Input } from "postcss";
import InputField from "components/InputField";
import { useState } from "react";
import CustomButton from "components/CustomButton";
import { Link } from "expo-router";
import OAuth from "components/Oauth";

const Sign_up = () =>{

    const[form,setForm] = useState({
        name:'',
        email:'',
        password:'',
    })

const onSignUpPress = async () =>{};

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250]"/>
                    <Text className="text-slate-800 text-3xl font-serif-bold mx-10 text-left">Создать аккаунт</Text>
                </View>
                <View className="p-5">
                    <InputField  label="Имя"
                    placeholder="Введи свое имя" 
                    icon={icons.person}
                    value={form.name}
                    onChangeText={(value)=>setForm({...form, name: value})}
                    />
                    <InputField  label="Пароль"
                    placeholder="Введи свой пароль" 
                    icon={icons.lock}
                    value={form.password}
                    secureTextEntry={true}
                    onChangeText={(value)=>setForm({...form, password: value})}
                    />
                    <InputField  label="Email"
                    placeholder="Введи свой email" 
                    icon={icons.email}
                    value={form.email}
                    onChangeText={(value)=>setForm({...form, email: value})}
                    />
                    <CustomButton 
                    title="Зарегестрироваться" 
                    onPress={onSignUpPress} 
                    className="mt-6"
                    />
                    <OAuth />
                    <Link href = "/sign-in" className="text-lg text-center text-general-200">
                    <Text>Уже есть аккаунт? </Text>
                    <Text className="text-primary-500">Войти</Text>
                    </Link>
                </View>
                {/* Верификация */}
            </View>
            </ScrollView>
    )
};
export default Sign_up;