import { useEffect, useState } from 'react';
import './App.css';
import Graphviz from 'graphviz-react';
import { Circles } from 'react-loader-spinner';

function App() {
  const [dot, setDot] = useState('graph{a--b}');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bst, setBST] = useState(1);

  async function fetchData(num) {
    try {
      setError(null)
      const url = `https://graph-tp.vercel.app/data/${num}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const data = await response.text();
      return data;
    } catch (error) {
      setError(error);
      return null;
    }
  }

  // Effect to fetch data when `bst` changes and show the loading spinner
  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      setLoading(true);
      const data = await fetchData(bst);
      if (data) {
        setDot(data);
      }
      setLoading(false);
    };

    fetchDataAndSetLoading();
  }, [bst]);

  // Effect to poll for data changes without showing the loading spinner
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await fetchData(bst);
      if (data && data !== dot) {
        setDot(data);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [bst, dot]);

  if (error != null) {
    return <div className='container' style={{ fontSize: "3rem" }}> Please launch the C program before </div>;
  }

  const bstlinks = () => {
    const elements = [];
    for (let i = 1; i <= 10; i++) {
      elements.push(<div key={i} onClick={() => setBST(i)} style={{ fontSize: "1.2rem", cursor: "pointer" }}>Arbre {i}</div>);
    }
    return elements;
  }

  return (
    <>
      <div className='container'>
        <div className='links' style={{ display: "flex", justifyContent: "space-between", width: "80%", padding: "60px" }}>
          {bstlinks()}
        </div>
        <h2 style={{ marginBottom: "20px", textDecoration: "underline", fontSize: "2rem" }}>
          Arbre <span style={{ color: "red" }}> {bst}</span> :
        </h2>
        {loading ? (
          <div className="container">
            <Circles
              height="80"
              width="80"
              color="#f4f4f4"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <Graphviz key={dot} dot={dot} options={{ height: '100%', width: '900px' }} />
        )}
        <p style={{ padding: "10px" }}>&copy; All rights reserved Zakaria Benhamiche </p>
      </div>
    </>
  );
}

export default App;
