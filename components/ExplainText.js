import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Dimensions,
    Easing
} from 'react-native';

export default class ExplainText extends Component {

    state = {};

    constructor() {
        super();
        this.scale = new Animated.Value(.8);
    }

    componentDidMount() {
        this.animate();
    }
    
    animate() {
        Animated.sequence([
            Animated.timing(this.scale, {
                toValue: 0.95,
                duration: 200,
                easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(this.scale, {
                toValue: 0.9,
                duration: 100,
                easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(this.scale, {
                toValue: 1,
                duration: 200,
                easing: Easing.inOut(Easing.quad)
            })
        ])
        .start();
    }

    render() {
        const { text, color } = this.props;

        return (
            <Animated.View 
                style={{ ...styles.container, backgroundColor: color,  transform: [{ scaleX: this.scale }, { scaleY: this.scale }] }}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 10,
        borderRadius: 5
    },
    text: {
        color: '#FFF',
        fontSize: 14,
        lineHeight: 20
    }
});