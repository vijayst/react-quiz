import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Quiz from '../firebase/quiz';

class Quizzes extends Component {
    static navigationOptions = {
        title: 'Quiz Collection',
    };

    state = { quizzes: [] };

    componentDidMount() {
        Quiz.getQuizzes()
        .then(quizzes => {
            this.setState({ quizzes });
        });
    }

    handleQuizStart(id, name) {
        this.props.navigation.navigate('Quiz', { id, name });
    }

    render() {
        return this.state.quizzes.length ? (
            <FlatList
                data={this.state.quizzes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={this.handleQuizStart.bind(this, item.id, item.name)}>
                        <Text style={styles.quizName}>{item.name}</Text>
                        <Text style={styles.chevronRight}>></Text>
                    </TouchableOpacity>
                )}
            />
        ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            );
    }
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        paddingLeft: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc'
    },
    quizName: {
        fontSize: 22,
        color: '#444'
    },
    chevronRight: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#999'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Quizzes;