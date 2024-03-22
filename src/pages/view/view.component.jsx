import React, {useState, useEffect} from 'react';
import firestore from '../../firebase/firebase.utils';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './view.styles.css';
import { toast } from 'react-toastify';

const View = () => {
    const [contact, setContact] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        firestore.collection('contacts').doc(id).get().then((doc) => {
        if (doc.exists) {
            setContact(doc.data());
        } else {
            navigate('/');
        }
        });
    }, [id, navigate]);

    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            if (firestore.collection('contacts').doc(id).delete()) {
                toast.success('Contact deleted successfully!');
                navigate('/');
            } else {
                toast.error('Failed to delete contact!');
            }    
        }
    }
    
    return (
        <div className='view-container'>
        <h1>Contact Details</h1>
        <div className='contact-details'>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.contact}</p>
            <p><strong>Address:</strong> {contact.address}</p>
        </div>
        <Link to={`/update/${id}`}>
            <button className='btns edit-button'>Edit</button>
        </Link>
        <Link to='/'>
            <button className='btns back-button'>Back</button>
        </Link>
        <button className='btns delete-button' onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}

export default View;