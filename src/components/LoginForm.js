import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser, validateEmail, setError } from '../actions/AuthActions';


class LoginForm extends Component{
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(password) {
        this.props.passwordChanged(password);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    renderError() {
        if(this.props.error) {
            return (
                <View style={{ backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if(this.props.loading) {
            return <Spinner />
        }

        return (
            <Button
                onPress={this.onButtonPress.bind(this)}
                disabled={!this.props.validation.email}
            >
                Login
            </Button>
        );
    }

    validateEmail() {
        const { email, validateEmail } = this.props;
        const regex = /\S+@\S+\.\S+/;
        const valid = regex.test(email);

        validateEmail(valid);

        if(!valid) {
            this.props.setError('Please enter valid email');
        } else {
            this.props.setError('');
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label={'Email'}
                        placeholder={'email@gmail.com'}
                        keyboardType={'email-address'}
                        onChangeText={this.onEmailChange.bind(this)}
                        onBlur={this.validateEmail.bind(this, this.props.email)}
                        style={this.props.validation.email ? {} : styles.invalidInput }
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label={'Password'}
                        placeholder={'password'}
                        secureTextEntry
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    invalidInput: {
        borderBottomWidth: 1.5,
        borderBottomColor: 'red'
    }
};

const mapStateToProps = state => {
    const { email, password, error, loading, validation } = state.auth;

    return { email, password, error, loading, validation };
};

const actions = {
    emailChanged,
    passwordChanged,
    loginUser,
    validateEmail,
    setError
};

export default connect(mapStateToProps, actions)(LoginForm);
