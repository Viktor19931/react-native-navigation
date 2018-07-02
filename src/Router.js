import React from 'react';
import { Platform,  } from 'react-native';
import { Scene, Router, Actions } from "react-native-router-flux";

import LoginForm from "./components/LoginForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeCreate from "./components/EmployeeCreate";

const RouterComponent = () => {
    const { headerTitleStyle, employeesTitleStyle, createEmployeeTitleStyle } = styles;

    return (
        <Router>
            <Scene key="root"  hideNavBar>
                <Scene key="auth" initial>
                    <Scene
                        key="login"
                        component={LoginForm}
                        title="Please login"
                        titleStyle={headerTitleStyle} />
                </Scene>
                <Scene key="main">
                    <Scene initial
                        key="employeeList"
                        component={EmployeeList}
                        title="Employees"
                        titleStyle={[headerTitleStyle, employeesTitleStyle]}
                        rightTitle="Add"
                        onRight={() => Actions.employeeCreate()}
                        rightButtonStyle={{width: 40}}
                    />
                    <Scene
                        key="employeeCreate"
                        component={EmployeeCreate}
                        title="Create Employee"
                        titleStyle={[headerTitleStyle, createEmployeeTitleStyle]}
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

const styles = {
    headerTitleStyle: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    employeesTitleStyle: {
        marginRight: (Platform.OS === "android") ? -56 : 0,
    },
    createEmployeeTitleStyle: {
        marginLeft: -10
    }
};

export default RouterComponent;
