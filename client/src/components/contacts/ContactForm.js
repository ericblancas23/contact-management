import React, { useContext, useState, useEffect } from 'react';


export const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    });
    const { name, email, phone, type } = contact;
    const onChange = (e) => {
        e.preventDefault();
        setContact(e.target.value);
    }
    return (
        <form>
            <h2 className="text-primary">Add Contact</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={(e) => onChange(e)}/>
            <input type="email" placeholder="email" name="email" value={email} onChange={(e) => onChange(e)}/>
            <input type="phone" placeholder="phone" name="phone" value={phone} onChange={(e) => onChange(e)}/>
            <h5>Contact type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'}/> Personal {' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'}/> professional {' '}
            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block" 
                onChange={(e) => {
                    setContact({ ...contact, [e.target.name]: e.target.value })
                }}
                />
            </div>
        </form>
    )
}

