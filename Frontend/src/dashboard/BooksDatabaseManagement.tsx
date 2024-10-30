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
      console.log(books); // Лог для перевірки даних
      setData(books);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
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
        genre: { type: 'string' }, // Визначаємо, що genre — це поле типу string
        title: { type: 'string' }, // Визначаємо title як string
      },
    },
    slice: {
      rows: [
        { uniqueName: 'genre' }, // Використовуємо genre для групування
      ],
      measures: [
        { uniqueName: 'title', aggregation: 'count' }, // Підрахунок кількості книг
      ],
    },
    options: {
      viewType: 'charts',
      chart: {
        type: 'column', // Встановлюємо тип діаграми на 'column'
      },
    },
  };

  return (
    <div className='container'>
      <h1>Books Database Statistics</h1>
      <p>Default setting are for the genres of books in database. </p>
      <p>However, if you click on 'fields' you will be able to get statistics based on other fields.</p>
      <FlexmonsterReact.Pivot
        report={pivotConfig}
        toolbar={true}
        width="100%"
        height="500px"
      />
    </div>
  );
}
