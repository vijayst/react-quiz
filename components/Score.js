import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Share
} from 'react-native';

export default class Score extends Component {

    state = {};

    static navigationOptions = {
        header: null,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { navigation: { state: { params } } } = nextProps;
        if (!prevState.stateSet) {
            const { quiz: { id, name, correct, questions }} = params;
            const count = questions.length;
            const score = Math.round(correct / count * 100);
            return {
                id,
                quizName: name,
                score,
                correct,
                count,
                stateSet: true
            };
        }
        return null;
    }

    handleHomePress() {
        this.props.navigation.navigate('Home');
    }

    handleExplain() {
        const { navigation, navigation: { state: { params: { quiz } } } } = this.props;
        navigation.navigate('Explain', { quiz });
    }

    handleTryPress() {
        this.props.navigation.goBack();
    }

    handleSharePress() {
        const { score, quizName } = this.state;
        Share.share({ 
            message: `I scored ${score}% in ${quizName} Quiz. Get the Android app at https://play.google.com/store/apps/details?id=com.vijayt.reactquiz`
        }, {
            dialogTitle: 'Share my score'
        });
    }

    render() {
        const { quizName, score, correct, count } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    {quizName} Quiz
                </Text>
                <View style={styles.scoreContainer}>
                    <Text style={styles.score}>
                        {score}%
                    </Text>
                    <Text style={styles.smallText}>
                        You answered {correct} questions right out of a total of {count} questions.
                    </Text>
                </View>
                {score !== 100 && (
                    <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={this.handleExplain.bind(this)}>
                    <Text style={styles.buttonText}>EXPLAIN</Text>
                </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={this.handleHomePress.bind(this)}>
                    <Text style={styles.buttonText}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={this.handleTryPress.bind(this)}>
                    <Text style={styles.buttonText}>TRY AGAIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={this.handleSharePress.bind(this)}>
                    <Text style={styles.buttonText}>SHARE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1B16A',
        padding: 20,
        margin: 15,
        borderRadius: 5
    },
    scoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        color: '#FFF',
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: 2
    },
    score: {
        fontSize: 80,
    },
    smallText: {
        marginTop: 32,
        fontSize: 24,
        width: '80%',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#375E97',
        padding: 20,
        borderRadius: 5,
        marginTop: 15
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center'
    }
});
