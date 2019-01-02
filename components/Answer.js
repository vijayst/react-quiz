import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    Easing
} from "react-native";

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
const INITIAL_COLOR = "rgba(89, 77, 70, 1)";
const RIGHT_COLOR = "rgba(63, 104, 28, 1)";
const WRONG_COLOR = "rgba(251, 101, 66, 1)";
const EaseQuadInOut = Easing.inOut(Easing.quad);
        

export default class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.value = new Animated.Value(0);
        this.colorValue = new Animated.Value(0);
        const indicatorColor = props.isAnswer ? RIGHT_COLOR : WRONG_COLOR;
        this.backgroundColor = this.colorValue.interpolate({
            inputRange: [0, 1],
            outputRange: [INITIAL_COLOR, indicatorColor]
        });
        this.scale = this.value.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1]
        });
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        Animated.timing(this.value, {
            toValue: 1,
            easing: EaseQuadInOut,
            duration: 600
        }).start();
    }

    handleAnswerPress() {
        if (!this.props.answered) {
            this.props.onDisable();
            Animated.sequence([
                Animated.delay(100),
                Animated.timing(this.colorValue, {
                    toValue: 1,
                    duration: 500
                }),
                Animated.delay(1000)
            ]).start(() => {
                this.props.onAnswered(this.props.isAnswer);
            });
        }
    }

    render() {
        const { text, answered } = this.props;

        return (
            <AnimatedButton
                style={{
                    ...styles.container,
                    backgroundColor: this.backgroundColor,
                    transform: [{ scaleX: this.scale }, { scaleY: this.scale }]
                }}
                onPress={this.handleAnswerPress.bind(this)}
                activeOpacity={0.8}
                disabled={answered}
            >
                <Text style={styles.text}>{text}</Text>
            </AnimatedButton>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,
        padding: 10,
        borderRadius: 5
    },
    text: {
        color: "#FFF",
        fontSize: 14,
        lineHeight: 20
    }
});
