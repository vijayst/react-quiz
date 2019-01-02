import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Dimensions,
    Easing
} from 'react-native';

export default class Question extends Component {

    state = {};

    constructor() {
        super();
        this.value = new Animated.Value(0);
        this.skewY = this.value.interpolate({
            inputRange: [0, 1],
            outputRange: ['-30deg', '0deg']
        });
        this.translateX = this.value.interpolate({
            inputRange: [0, 1],
            outputRange: [-Dimensions.get('window').width, 0]
        });
        this.translateY = this.value.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0]
        });
    }

    componentDidMount() {
        this.animate();
    }
    
    animate() {
        Animated.timing(this.value, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.quad)
        }).start();
    }

    render() {
        const { text } = this.props;

        return (
            <Animated.View 
                style={{ ...styles.container, transform: [{ skewY: this.skewY }, { translateX: this.translateX }, { translateY: this.translateY }] }}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#375E97',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center'
    }
});