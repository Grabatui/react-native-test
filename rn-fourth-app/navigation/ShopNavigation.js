import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductListScreen from '../screens/shop/ProductListScreen';

import colors from '../constants/colors';


const Stack = createStackNavigator();

const ShopNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Products"
            screenOptions={{
                headerStyle: styles.wrapperHeader,
                headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
            }}
        >
            <Stack.Screen
                name="Products"
                component={ProductListScreen} 
                options={{
                    headerTitle: 'All products',
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    wrapperHeader: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : '',
    }
});

export default ShopNavigation;
