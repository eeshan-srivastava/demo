import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import colorCode from '../../resources/colors/colorCode';
import NavigationRoutes from './NavigationRoutes';
import { StyleSheet } from 'react-native';
import Main from '../presentation/main/Main';
import ColorUtils from '../../resources/colors/ColorUtils';
import Rides from '../presentation/rides/Rides';
import Payment from '../presentation/payment/Payment';

const ReactNavStack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <ReactNavStack.Navigator
                screenOptions={{
                    gestureEnabled: false,
                    headerShown: false,
                    contentStyle: styles.container1,
                    animation: 'slide_from_right',
                    statusBarColor: ColorUtils.getAlphaColor({
                        colorCode: colorCode.black,
                        opacityPercent: 100,
                    }),
                    statusBarStyle: 'light',
                    statusBarAnimation: 'fade',
                }}>
                <ReactNavStack.Screen name={NavigationRoutes.main} component={Main} />
                <ReactNavStack.Screen name={NavigationRoutes.rides} component={Rides} />
                <ReactNavStack.Screen name={NavigationRoutes.payments} component={Payment} />
            </ReactNavStack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container1: {
        backgroundColor: colorCode.transparent,
    },
});

export default Navigation;
