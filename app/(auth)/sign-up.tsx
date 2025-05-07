import { View, Text, ScrollView, Image, Alert } from "react-native"
import { images, icons } from "../../constants"
import InputField from "components/InputField";
import { useState } from "react";
import CustomButton from "components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "components/Oauth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from "lib/fetch";

const Sign_up = () => {

  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModal, setshowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: ''

  });

  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification,
        state: 'pending'

      })
    } catch (err:any) {
      Alert.alert('Error',err.errors[0].longMessage);
        }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (signUpAttempt.status === 'complete') {
        //TODO
        await fetchAPI('/(api)/user',{
          method:"POST",
          body:JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,

          }),
        })
        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          error: 'Verification failed',
          state: 'faild'
        });
      }
    } catch (err: any) {

      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'faild'
      });
    }
  }


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250]" />
          <Text className="text-slate-800 text-3xl font-serif-bold mx-10 text-left">Создать аккаунт</Text>
        </View>
        <View className="p-5">
          <InputField label="Имя"
            placeholder="Введи свое имя"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField label="Пароль"
            placeholder="Введи свой пароль"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <InputField label="Email"
            placeholder="Введи свой email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <CustomButton
            title="Зарегестрироваться"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <OAuth />
          <Link href="/sign-in" className="text-lg text-center text-general-200">
            <Text>Уже есть аккаунт? </Text>
            <Text className="text-primary-500">Войти</Text>
          </Link>
        </View>
        <ReactNativeModal isVisible={verification.state === 'pending'} onModalHide={()=> {
        if(verification.state ==='success')setshowSuccessModal(true)}}>
        <View className = "bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">Верификация</Text>
            <Text className="font-Jakarta mb-5">Код верификации отправлен на почту {form.email}</Text>

            <InputField label="Code" 
            icon={icons.lock} placeholder = "12345"
            value={verification.code} keyboardType = "numeric"
            onChangeText = {(code)=>
             setVerification({... verification,code})}/>
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton title="Подтвердить" onPress={onVerifyPress} className="mt-5 bg-success-500"/>
          </View>
        </ReactNativeModal>


        <ReactNativeModal isVisible={showSuccessModal} >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
            <Text className="text-3xl font-JakartaBold text-center">
              Авторизован
            </Text>
            <Text className="text-base text-grey-200 font-Jakarta text-center mt-2"> Ваш аккаунт успешно авторизован</Text>
            <CustomButton title="Вернуться на главную" onPress={() =>{setshowSuccessModal(false); router.push('/(root)/(tabs)/home')}} className="mt-5"/>
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  )
};
export default Sign_up;