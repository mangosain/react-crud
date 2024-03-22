import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './addContact.styles.css';
import {toast} from 'react-toastify';
import firestore from '../../firebase/firebase.utils.js';

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

    const {id} = useParams();

    useEffect(() => {
        firestore.collection('contacts').onSnapshot((snapshot) => {
          let fetchedData = {};
          snapshot.forEach((doc) => {
            fetchedData[doc.id] = doc.data();
          });
          setData(fetchedData);
        });
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({...data[id]});
        } else {
            setState({...inititalState});
        }

        return () => {
            setState({...inititalState});
        }
    }, [id, data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !contact || !address) {
            return toast.warning('Please fill in all fields');
        } else {
            if (!id) { 
                firestore.collection('contacts').add(state)
                .then((docRef) => {
                    toast.success('Contact added successfully');
                })
                .catch((error) => {
                    toast.error(error.message);
                });

                setTimeout(() => navigate('/'), 800);
            } else {
                firestore.collection('contacts').doc(id).set(state)
                .then(() => {
                    toast.success('Contact updated successfully');
                })
                .catch((error) => {
                    toast.error(error.message);
                });

                setTimeout(() => navigate('/'), 800);
            }
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    }

    return (
        <div className="add-contact-container">
            <h1>
                {
                    id ? "Update Contact" : "Add Contact"
                }
            </h1>
            <form className="add-contact-form" onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter the name" value={name || ""} onChange={handleInputChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter the email" value={email || ""} onChange={handleInputChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="contact">Contact</label>
                    <input type="number" id="contact" name="contact" placeholder="Enter the contact number" value={contact || ""} onChange={handleInputChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="address">Address</label>
                    <textarea type="text" id="address" name="address" placeholder="Enter the address" value={address || ""} onChange={handleInputChange} />
                </div>

                <input type="submit" value={id ? "Update Contact" : "Save Contact"} className="btn" />
            </form>
        </div>
    );
}

export default AddContact;