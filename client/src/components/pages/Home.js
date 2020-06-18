import React from 'react';
import { Contacts } from '../../components/contacts/Contacts';
import { ContactForm } from '../contacts/ContactForm';

export const Home = () => {
    return (
        <div class="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <Contacts />
            </div>
        </div>
    )
}
