import { useEffect, useState } from 'react';

import './App.css';
import Graphviz from 'graphviz-react';

import { Circles } from 'react-loader-spinner';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const [dot, setDot] = useState('graph{a--b}');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bst,setBST]  = useState(1);
  
  

  async function fetchData(num) {
    try {
      console.log(num);

      const url = `https://data/${num}`;
      setLoading(true);
      const response = await fetch(url);
      
      
      if (!response.ok) {

        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const data = await response.text();
      
      setDot(data);
      
    } catch (error) {
      
      setError(error);
    } finally {
      setLoading(false)
      
    }
  }


  useEffect(()=>{
    
      fetchData(bst);
    
    

  },[bst]);
  

  
    

  if (error!=null) {
    return <div className='container'  style={{fontSize:"3rem"}}> Please Lunch the C program before </div>;
  }
  

 
 const bstlinks = ()=>{
  const elements = []; // Initialize an empty array to hold the div elements
  
  for (let i = 1; i < 11; i++) {
    elements.push(<div key={i} onClick={()=>{setBST(i)}} style={{fontSize:"1.2rem",cursor:"pointer"}}>Arbre {i}</div>); // Push a new div element to the array
  }
  return elements;
 }
  

  

  return (
    <>
      <div className='container'>
        <div className='links'style={{display:"flex",justifyContent:"space-between",width:"80%",padding:"60px"}}>{bstlinks()}</div>
          <h2 style={{marginBottom:"20px",textDecoration:"underline",fontSize:"2rem"}}>Arbre <span style={{color:"red"}}> {bst}</span> :</h2>
         { loading? <div className="container">
      <Circles
      height="80"
        width="80"
        color="#f4f4f4"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>:
           
              <Graphviz key={dot} dot={dot} options={{ height: '100%', width: '900px' }}  />
             
          }
          <p style={{padding:"10px"}}>&copy; All rights reserved Zakaria Benhamiche </p>
          
            
        
      </div>
    </>
  );
}

export default App;
