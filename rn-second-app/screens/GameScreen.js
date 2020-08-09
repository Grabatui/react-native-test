import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card'


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    let result;

    do {
        result = Math.floor(Math.random() * (max - min)) + min;
    } while (exclude === result);

    return result;
};

const callWrongDirectionAlert = () => {
    Alert.alert(
        'Don\'t lie!',
        'You know this is wrong...',
        [
            {text: 'Sorry', 'style': 'cancel'},
        ]
    );
};

const GameScreen = (props) => {
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const createAnotherGuess = (excludeGuess) => {
        return generateRandomBetween(currentMin.current, currentMax.current, excludeGuess);
    };

    const [currentGuess, setCurrentGuess] = useState(createAnotherGuess(props.userChoice));
    const [rounds, setRounds] = useState(0);

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds);
        }
    }, [currentGuess, props.userChoice, props.onGameOver]);

    const onButtonPress = (direction) => {
        if (direction !== 'lower' && direction !== 'greater') {
            return;
        }

        switch (direction) {
            case 'lower':
                if (currentGuess < props.userChoice) {
                    callWrongDirectionAlert();

                    return;
                }

                currentMax.current = currentGuess;
                break;

            case 'greater':
                if (currentGuess > props.userChoice) {
                    callWrongDirectionAlert();

                    return;
                }

                currentMin.current = currentGuess;
                break;
        }

        setCurrentGuess(createAnotherGuess(currentGuess));

        setRounds((currentRounds) => currentRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>

            <NumberContainer>{currentGuess}</NumberContainer>

            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={onButtonPress.bind(this, 'lower')} />
                <Button title="GREATER" onPress={onButtonPress.bind(this, 'greater')} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
});

export default GameScreen;