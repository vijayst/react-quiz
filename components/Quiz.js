import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Question from "./Question";
import Answer from "./Answer";
import Score from "./Score";
import firebase from "react-native-firebase";
import QuizModel from "../firebase/quiz";
import NavRight from "./NavRight";
import { knuthShuffle as shuffle } from "knuth-shuffle";

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
if (__DEV__) {
    request.addTestDevice();
}

export default class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { name, count, current } = navigation.state.params;
        return {
            title: name,
            headerRight: <NavRight count={count} current={current} />
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            current: 0,
            correct: 0
        };
        props.navigation.addListener('willFocus', () => {
            this.setState({
                questions: [],
                current: 0,
                correct: 0
            });
            this.props.navigation.setParams({ count: 0 });
        });
        props.navigation.addListener('didFocus', () => {
            this.handleQuizGet();
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { id, name } = nextProps.navigation.state.params;
        if (!prevState.stateSet) {
            return {
                id,
                name,
                stateSet: true,
                questions: [],
                current: 0,
                correct: 0
            };
        }
        return null;
    }

    handleQuizGet() {
        const { id } = this.state;
        QuizModel.getQuestions(id).then(quiz => {
            let questions = shuffle(quiz.slice());
            questions.forEach(q => {
                q.answers = shuffle(q.answers.slice());
            });
            questions = __DEV__ ? questions.slice(0, 2) : questions;
            this.setState({
                questions
            });
            this.props.navigation.setParams({
                count: questions.length,
                current: 0
            });
        });
    }

    handleAnswered(answerIndex, correctAnswer) {
        const { current, correct, questions } = this.state;
        const showScore = current === questions.length - 1;
        let wrong = this.state.wrong;
        if (!correctAnswer) {
            if (!wrong) wrong = {};
            wrong[current] = answerIndex;
        }
        this.setState(
            {
                answered: false,
                current: showScore ? current : current + 1,
                correct: correctAnswer ? correct + 1 : correct,
                wrong
            },
            () => {
                if (showScore) {
                    this.props.navigation.navigate("Score", {
                        quiz: this.state
                    });
                } else {
                    this.props.navigation.setParams({
                        current: current + 1
                    });
                }
            }
        );
    }

    handleDisable() {
        this.setState({
            answered: true
        });
    }

    renderView() {
        const { questions, current, answered } = this.state;
        const question = questions[current];
        return (
            <View style={styles.container}>
                <Question
                    key={current}
                    text={question.question}
                />
                {question.answers.map((answer, index) => (
                    <Answer
                        key={`${current}_${index}`}
                        text={answer.value}
                        isAnswer={answer.score === 1}
                        answered={answered}
                        onDisable={this.handleDisable.bind(this)}
                        onAnswered={this.handleAnswered.bind(this, index)}
                    />
                ))}
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

    render() {
        const { questions, current, correct } = this.state;
        return questions.length ? (
            this.renderView()
        ) : (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D5D6D2",
        padding: 16
    },
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    banner: {
        marginTop: 8,
        marginBottom: 8,
        alignItems: "center"
    }
});
