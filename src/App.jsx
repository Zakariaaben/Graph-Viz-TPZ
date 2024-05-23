import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Graphviz from 'graphviz-react';
import { useRef } from 'react';

function App() {
  const [dot, setDot] = useState('graph{a--b}');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const myreef = useRef()

  async function fetchData() {
    try {
      const response = await fetch('https://graph-tp.vercel.app/data');
      
      if (!response.ok) {

        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const data = await response.text();
      setDot(data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // Set up the interval to fetch data every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // 10000 milliseconds = 10 seconds

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);
  

  if (loading) {
    return <div style={{fontSize:"3rem"}}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if(dot == "Initial Content") {
    return <div style={{fontSize:"3rem"}}>Please Lunch the program before</div>;
  }

  

  return (
    <>
      <div className='container'  >
        <Graphviz dot={dot} width="300px"  options={{ height:"100%",width:"900px"}}/>
      </div>
    </>
  );
}

export default App;
