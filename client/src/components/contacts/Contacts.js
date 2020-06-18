import React, { useContext, Fragment } from 'react'
import ContactContext from '../../context/contact/contactContext'
import { ContactItem } from './ContactItem';

export const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts } = contactContext;
    return (
        <Fragment>
            {contacts.map((item) => {
               return(
                   <ContactItem key={item.id} contact={item}/>
               )
            })}
        </Fragment>
    )
}
