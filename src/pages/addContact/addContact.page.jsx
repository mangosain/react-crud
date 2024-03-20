import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './addContact.styles.css';
import {toast} from 'react-toastify';
import firestore from '../../firebase.utils.js';

const inititalState = {
    name: '',
    email: '',
    contact: '',
    address: '',
};

const AddContact = () => {
    const [state, setState] = useState(inititalState);
    const [data, setData] = useState({});
    const {name, email, contact, address} = state;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !contact || !address) {
            return toast.warning('Please fill in all fields');
        } else {
            firestore.collection('contacts').add(state)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                toast.success('Contact added successfully');
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                toast.error(error.message);
            });

            setTimeout(() => navigate('/'), 800);
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    }

    return (
        <div className="add-contact-container">
            <form className="add-contact-form" onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter the name" value={name} onChange={handleInputChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter the email" value={email} onChange={handleInputChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="contact">Contact</label>
                    <input type="number" id="contact" name="contact" placeholder="Enter the contact number" value={contact} onChange={handleInputChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="address">Address</label>
                    <textarea type="text" id="address" name="address" placeholder="Enter the address" value={address} onChange={handleInputChange} />
                </div>

                <input type="submit" value="Add Contact" className="btn" />
            </form>
        </div>
    );
}

export default AddContact;