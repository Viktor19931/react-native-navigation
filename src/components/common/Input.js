import React from 'react';
import { TextInput, View, Text } from 'react-native'

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, onBlur, style}) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{ label }</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={ placeholder }
                keyboardType={keyboardType || 'default'}
                underlineColorAndroid='rgba(0,0,0,0)'
                value={value}
                autoCorrect={false}
                onChangeText={onChangeText}
                onBlur={onBlur || (() => {})}
                style={[inputStyle, style]}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingHorizontal: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        borderBottomWidth: 0
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
