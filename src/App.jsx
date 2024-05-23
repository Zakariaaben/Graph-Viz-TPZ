import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Graphviz from 'graphviz-react';
import { useRef } from 'react';
import { Circles } from 'react-loader-spinner';

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
    return <div className="container">
      <Circles
      height="80"
        width="80"
        color="#f4f4f4"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>;
  }

  if (error) {
    return <div> Please Lunch the C program before </div>;
  }
  if(dot == "Initial Content") {
    return <div style={{fontSize:"3rem"}}>Please Lunch the C program before</div>;
  }

  

  return (
    <>
      <div className='container'  >
        <Graphviz dot={dot}   options={{ height:"100%",width:"900px"}}/>
      </div>
    </>
  );
}

export default App;
