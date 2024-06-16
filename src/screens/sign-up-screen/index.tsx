import React from 'react';
import { Box, Text } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/shared/input';
import Button from '../../components/shared/button';
import { Pressable } from 'react-native';
import useUserGlobalStore from '../../store/useUserGlobalStore';
import { Controller, useForm } from 'react-hook-form';
import { registerUser } from '../../services/api';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import { IUser } from '../../types';

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();

    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn");
    };

    const { updateUser } = useUserGlobalStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: IUser) => {
        try {
            const { email, name, password } = data;
            await registerUser({
                email, name, password,
            });
            navigateToSignInScreen();
        } catch (error) {
            console.error(error); // Hata ayıklama için
        }
    };

    return (
        <SafeAreaWrapper>
            <Box flex={1} px="5.5" mt={"13"}>
                <Text variant="textX1" fontWeight="700">
                    Yapılacaklar Uygulamasına Hoşgeldin
                </Text>
                <Text variant="textX1" fontWeight="700" mb="6">
                    Yolculuğun burada başlıyor
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Name"
                            error={errors.name}
                        />
                    )}
                    name="name"
                />
                <Box mb="6" />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Email"
                            error={errors.email}
                        />
                    )}
                    name="email"
                />
                <Box mb="6" />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Password"
                            error={errors.password}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />
                <Box mt="5.5" />
                <Pressable onPress={navigateToSignInScreen}>
                    <Text color="primary" textAlign="right">
                        Zaten hesabın var mı?
                    </Text>
                </Pressable>
                <Box mb="5.5" />
                <Button label="Kayıt Ol" onPress={handleSubmit(onSubmit)} uppercase />
            </Box>
        </SafeAreaWrapper>
    );
};

export default SignUpScreen;