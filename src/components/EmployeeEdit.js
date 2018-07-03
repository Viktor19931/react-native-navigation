import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';

import { Card, CardSection, Button, Confirm } from "./common";
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, deleteEmployee } from '../actions';

class EmployeeEdit extends Component{
    state = { showModal: false };
    componentWillMount() {
        // Update state of current employee
        const employee = this.props.employee;

        const props = Object.keys(employee);

        props.forEach(prop => {
            let value = employee[prop];
            this.props.employeeUpdate({ prop, value});
        });

    }

    onButtonPress() {
        const { name, phone, shift } = this.props;

        console.log(this.props);

        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;

        Communications.text(phone, `Your upcoming shift is on ${ shift }`);

    }

    onAccept() {
        const { uid } = this.props.employee;

        this.props.deleteEmployee({ uid });
    }

    onDecline() {
        this.setState({ showModal: false });

    }

    render() {
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
                        Fire Employee
                    </Button>
                </CardSection>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this ?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

const actions = { employeeUpdate, employeeSave, deleteEmployee };

export default connect(mapStateToProps, actions)(EmployeeEdit);
