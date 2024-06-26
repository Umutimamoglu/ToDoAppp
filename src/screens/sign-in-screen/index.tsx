import React from 'react';
import { Box, Text } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import Input from '../../components/shared/input';
import Button from '../../components/shared/button';
import { Pressable } from 'react-native';
import useUserGlobalStore from '../../store/useUserGlobalStore';
import { Controller, useForm } from 'react-hook-form';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import { loginUser } from '../../services/api';
import { IUser } from '../../types';

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();

    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp"); // This should navigate to SignUp, not SignIn
    };

    const { updateUser } = useUserGlobalStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<IUser, "name">>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: Omit<IUser, "name">) => {
        try {
            const { email, password } = data;
            const _user = await loginUser({
                email: email.toLowerCase(),
                password: password.toLowerCase(),
            });
            updateUser({
                email: _user.email,
                name: _user.name,
            });
        } catch (error) {
            console.error(error); // Error handling ekledim
        }
    };

    return (
        <SafeAreaWrapper>
            <Box flex={1} px="5.5" justifyContent="center">
                <Text variant="textX1" fontWeight="700">
                    Welcome Back
                </Text>
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
                <Pressable onPress={navigateToSignUpScreen}>
                    <Text color="primary" textAlign="right">
                        Kayıt Ol
                    </Text>
                </Pressable>
                <Box mb="5.5" />
                <Button label="Giriş Yap" onPress={handleSubmit(onSubmit)} uppercase />
            </Box>
        </SafeAreaWrapper>
    );
};

export default SignInScreen;