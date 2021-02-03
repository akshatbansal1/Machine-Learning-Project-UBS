import React, {useState, useEffect} from 'react';
import './AppJ.css';
import {Link} from 'react-router-dom';

function Portfolio() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([])


  const fetchItems = async () => {
    const data = await fetch('https://fortnite-api.com/v1/playlists');
    const items = await data.json();
    console.log(items.data);
    setItems(items.data);
  }
  return (
    <div className="content">
      {items.map(item => (
          <h1 key={item.id}>
          <Link to={`/portfolio/${item.id}`}>{item.name}</Link>
          </h1>
      ))}
    </div>
  );
}

export default Portfolio;
