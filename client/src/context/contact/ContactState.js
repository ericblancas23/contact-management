import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1, 
                name: 'Eric',
                email: 'eric@eric.com',
                phone: '111-111-1111',
                type: 'professional'
            },
            {
                id: 2, 
                name: 'sammy',
                email: 'sammy@sammy.com',
                phone: '211-111-1111',
                type: 'personal'
            },
            {
                id: 3, 
                name: 'chris',
                email: 'chris@chris.com',
                phone: '311-111-1111',
                type: 'professional'
            },
            {
                id: 4, 
                name: 'johnny',
                email: 'johnny@johnny.com',
                phone: '411-111-1111',
                type: 'professional'
            }
        ]

    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //actions for contacts
        //add
        //delete
        //update
        //set
        //clear
        //filter
        //clear filter

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;