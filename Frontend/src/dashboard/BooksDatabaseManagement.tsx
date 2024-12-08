import 'flexmonster/flexmonster.css';
import * as FlexmonsterReact from 'react-flexmonster';
import { useEffect, useState } from 'react';

export default function BooksDatabaseManagement() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Функція для отримання даних з API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/books');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const books = await response.json();
      console.log(books); 
      setData(books);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError((error as any).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>Loading data...</div>;
  }


  const pivotConfig = {
    dataSource: {
      data: data,
      mapping: {
        genre: { type: 'string' }, 
        title: { type: 'string' }, 
      },
    },
    slice: {
      rows: [
        { uniqueName: 'genre' }, 
        
      ],
      measures: [
        { uniqueName: 'title', aggregation: 'count' }, 
      ],
    },
    options: {
      viewType: 'charts',
      chart: {
        type: 'column', 
      },
    },
  };

  return (
    <div className='container'>
      <div className="bookdb-info-container">
      <h1>Books Database Statistics</h1>
      <p>Default setting are for the genres of books in database. </p>
      <p>However, if you click on 'fields' you will be able to get statistics based on other fields.</p>
      <FlexmonsterReact.Pivot
        report={pivotConfig}
        toolbar={true}
        width="100%"
        height="500px"
        licenseKey="Z7XZ-10526T-236C68-5L0P05-6G4F4J-4N3F03-1Y5W6I-5L5668-4I2G2G-1R3V3R"
      />
      </div>
    </div>
  );
}
