import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import NavRight from './NavRight';
import Question from './Question';
import ExplainText from './ExplainText';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
if (__DEV__) {
    request.addTestDevice();
}

const INITIAL_COLOR = "rgba(89, 77, 70, 1)";
const RIGHT_COLOR = "rgba(63, 104, 28, 1)";
const WRONG_COLOR = "rgba(251, 101, 66, 1)";

export default class Explain extends Component {
    static navigationOptions = ({ navigation }) => {
        const { quiz: { wrong }, current } = navigation.state.params;
        return {
            title: 'Explain',
            headerRight: <NavRight count={Object.keys(wrong).length} current={current} />
        };
    };

    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.stateSet) {
            const { navigation: { state: { params: { quiz: { wrong, questions } } } } } = nextProps;
            const wrongQuestions = Object.keys(wrong).map(wrongId => {
                const { question, answers } = questions[wrongId];
                const rightAnswer = answers.find(a => a.score === 1);
                const wrongAnswer = answers[wrong[wrongId]];
                return {
                    question,
                    rightAnswer,
                    wrongAnswer
                };
            });
            return {
                wrongQuestions,
                stateSet: true,
                current: 0,
                count: wrongQuestions.length
            };
        }
        return null;
    }

    handleBack() {
        const { current } = this.state;
        if (current === 0) {
            this.props.navigation.goBack();
        } else {
            this.setState({
                current: current - 1
            });
            this.props.navigation.setParams({ current: current - 1 });
        }
    }

    handleNext() {
        const { current, count } = this.state;
        if (current === count - 1) {
            this.props.navigation.goBack();
        } else {
            this.setState({
                current: current + 1
            });
            this.props.navigation.setParams({ current: current + 1 });
        }
    }

    render() {
        const { wrongQuestions, current } = this.state;
        const { question, rightAnswer, wrongAnswer } = wrongQuestions[current];

        return (
            <View style={styles.container}>
                <Question key={current} text={question} />
                <ExplainText key={`${current}_1`} text={rightAnswer.value} color={RIGHT_COLOR} />
                <ExplainText key={`${current}_2`} text={'Hello'} color={INITIAL_COLOR} />
                <ExplainText key={`${current}_3`} text={wrongAnswer.value} color={WRONG_COLOR} />
                <ExplainText key={`${current}_4`} text={'World'} color={INITIAL_COLOR} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{ ...styles.button, marginRight: 15 }}
                        activeOpacity={0.8}
                        onPress={this.handleBack.bind(this)}>
                        <Text style={styles.buttonText}>BACK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={this.handleNext.bind(this)}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.banner}>
                    <Banner
                        unitId="ca-app-pub-2746031862127149/7992196669"
                        size="BANNER"
                        request={request.build()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D5D6D2',
        padding: 16
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    banner: {
        marginTop: 8,
        marginBottom: 8,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        flex: 1,
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
