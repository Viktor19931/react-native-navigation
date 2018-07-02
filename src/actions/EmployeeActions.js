import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    EMPLOYEE_UPDATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_CREATE,
    EMPLOYEE_SAVE
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase .auth();

        return (dispatch) => {
            firebase.database().ref(`/users/${currentUser.uid}/employees`)
                .push({ name, phone, shift})
                .then(() => {
                    dispatch({ type: EMPLOYEE_CREATE });
                    Actions.pop('employeeList');
                });
        };
};

export const employeesFetch = () => {
    const { currentUser } = firebase .auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`).on('value', snapshot => {
            dispatch({
                type: EMPLOYEES_FETCH_SUCCESS,
                payload: snapshot.val()
            });
        })
    };
};

export const employeeSave = ({ name, phone, shift, uid }) =>  {
    const { currentUser } = firebase .auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                Actions.pop('employeeList');
                dispatch({ type: EMPLOYEE_SAVE })
            });
    };

};

export const clearFormEmployee = () => {
    return { type: EMPLOYEE_SAVE };
};
