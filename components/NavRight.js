import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class NavRight extends Component {    
    render() {
        const { count, current } = this.props;
        return count ? (
            <View style={styles.container}>
                <Text style={styles.text1}>
                    {current + 1}
                </Text>
                <Text style={styles.text2}>
                    /
                </Text>
                <Text style={styles.text3}>
                    {count}
                </Text>
            </View>
        ) : null;
    }
}

NavRight.defaultProps = {
    count: 0,
    current: 0
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2F2E33',
        marginRight: 15,
        borderRadius: 8,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text1: {
        color: '#FFF',
        fontSize: 12,
        marginBottom: 14
    }, 
    text2: {
        color: '#FFF',
        fontSize: 24,
    },
    text3: {
        color: '#FFF',
        fontSize: 12,
        marginTop: 14
    }
});
