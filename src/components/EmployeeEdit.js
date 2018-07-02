import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';

import { Card, CardSection, Button, Confirm } from "./common";
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave } from '../actions';

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

export default connect(mapStateToProps, { employeeUpdate, employeeSave })(EmployeeEdit);
