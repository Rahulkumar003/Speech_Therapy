import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase.js';

const resourceCollectionRef = collection(db, "resources");

export async function getResources() {
    const data = await getDocs(resourceCollectionRef); 
    const dataArray = data.docs.map((doc) => ( { ...doc.data(), id: doc.id}));
    // console.log(dataArray);
    return dataArray;
};

