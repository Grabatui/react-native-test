import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const CategoriesScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Text>Categories screen</Text>

            <Button
                title="Go to the Meals"
                onPress={() => navigation.navigate('CategoryMeals')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoriesScreen;
