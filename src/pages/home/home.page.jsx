import React, {useState, useEffect} from 'react';
import firestore from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import './home.styles.css';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    firestore.collection('contacts').onSnapshot((snapshot) => {
      let fetchedData = {};
      snapshot.forEach((doc) => {
        fetchedData[doc.id] = doc.data();
      });
      setData(fetchedData);
    });
  }, []);

  var count = 1;

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      if (firestore.collection('contacts').doc(id).delete()) {
        toast.success('Contact deleted successfully!');
      } else {
        toast.error('Failed to delete contact!');
      }
    }
  }

  return (
    <div className='home-container'>
      <h1>Home Page</h1>
      <table className='contact-table'>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(data).map((id) => {
              return (
                <tr key={id}>
                  <th scope='row'>{count++}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].address}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className='btns edit-button'>Edit</button>
                    </Link>
                    <Link to={`/view/${id}`}>
                      <button className='btns view-button'>View</button>
                    </Link>
                    <button className='btns delete-button' onClick={() => onDelete(id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Home;