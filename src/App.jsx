import './App.css';
import Filters from './Filters';
import { getResources } from './config/firebase-functions';
import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch data from Firestore database and set to state
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const dataFromFirestore = await getResources();
        setData(dataFromFirestore || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    
      <h1> The Speech Resource Library</h1> 
                 

            <Filters data={data} loading={loading}/>

            <div id="footer">
              <p >Thanks Angshu Sir for motivating Us</p>
            </div>

    </> 
  )
}

export default App
