import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const FirebaseStorageStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const getStorageStatus = async () => {
      try {
        const storageRef = firebase.storage().ref();
        await storageRef.child('status.txt').getDownloadURL();
        setStatus('operational');
      } catch (error) {
        setStatus('not operational');
      }
    };

    getStorageStatus();
  }, []);

  return (
    <div>
      {status === 'operational' ? (
        <span style={{ color: 'green' }}>Firebase Storage is operational</span>
      ) : (
        <span style={{ color: 'red' }}>Firebase Storage is {status}</span>
      )}
    </div>
  );
};

export default FirebaseStorageStatus;