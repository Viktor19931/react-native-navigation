import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import EmployeeListItem from './EmployeeListItem';

import { employeesFetch } from "../actions";

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
        return <EmployeeListItem employee={employee}/>
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const employees =  Object.keys(state.employees).map((key) => {
        return { ...state.employees[key], uid: key };
    });

    return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
