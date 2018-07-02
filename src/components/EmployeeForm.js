import React, { Component } from 'react';
import { View, Text, Picker, Platform } from 'react-native';
import { connect } from "react-redux";

import { employeeUpdate } from "../actions";
import { CardSection, Input } from './common';
import { days } from "../constant";
import { clearFormEmployee } from '../actions';

class EmployeeForm extends Component {
    renderDaysInPicker() {
        return days.map(day=>
            <Picker.Item key={day} style={{flex: 2}} label={day} value={day} />
        );
    }

    componentWillUnmount() {
        this.props.clearFormEmployee();
    }

    render() {
        const { pickerCardSectionStyle, pickerLabelText, pickerBodyStyle} = styles;

        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Viktor"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({prop: 'name', value })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="5-55-55"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({prop: 'phone', value })}
                    />
                </CardSection>
                <CardSection style={pickerCardSectionStyle}>
                    <Text style={pickerLabelText}>Shift</Text>
                    <Picker
                        style={pickerBodyStyle}
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({prop: 'shift', value })}
                    >
                        {this.renderDaysInPicker()}
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    pickerLabelText: {
        fontSize: 18,
        paddingLeft: 20,
        flex: Platform.OS === "android" ? 1 : 0
    },
    pickerCardSectionStyle: {
        flexDirection: (Platform.OS === "android") ? 'row' : 'column',
        alignItems: (Platform.OS === "android") ? 'center' : 'stretch'
    },
    pickerBodyStyle: {
        flex: (Platform.OS === "android") ? 2 : 0
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, clearFormEmployee })(EmployeeForm);
