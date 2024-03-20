import React, {useState, useEffect} from 'react';
import firestore from '../../firebase.utils';
import { Link } from 'react-router-dom';
import './home.styles.css';

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

  return (
    <div className='home-container'>
      <h1>Home Page</h1>
      <table className='contact-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(data).map((id) => {
              return (
                <tr key={id}>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].address}</td>
                  <td>
                    <Link to={`/edit/${id}`}>Edit</Link>
                    <Link to={`/view/${id}`}>View</Link>
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