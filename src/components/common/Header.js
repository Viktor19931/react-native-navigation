import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{ props.headerText }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F8F8F8',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 7,
        position: 'relative',
        ...Platform.select({
            android: {
                paddingTop: 0,
            }
        })
    },
    textStyle: {
        fontSize: 20
    }
});



export { Header };
