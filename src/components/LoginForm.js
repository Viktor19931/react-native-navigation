import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser } from '../actions';


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
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }



    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label={'Email'}
                        placeholder={'email@gmail.com'}
                        onChangeText={this.onEmailChange.bind(this)}
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
    }
};

const mapStateToProps = state => {
    const { email, password, error, loading } = state.auth;

    return { email, password, error, loading };
};

const actions = {
    emailChanged,
    passwordChanged,
    loginUser
};

export default connect(mapStateToProps, actions)(LoginForm);
