import React, {useState, useEffect} from 'react';
import './AppJ.css';

function ItemDetail( {match }) {
  useEffect(() => {
      fetchItem();
      console.log(match)
  }, []);

  const [item, setItem] = useState({
      images: {}
  })

  const fetchItem = async() => {
      const fetchItem = await fetch(`https://fortnite-api.com/v1/playlists/${match.params.id}`)
      const item = await fetchItem.json();
      setItem(item.data);
      console.log(item);
  }
  return (
    <div>
        <h1>{item.description}</h1>
        <h2>{item.gameType}</h2>
    </div>
  );
}

export default ItemDetail;
