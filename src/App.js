import React, { useState, useEffect } from 'react';

const MusicQueue = () => {
  const [queue, setQueue] = useState([]);

  // Obtener la cola de canciones desde el backend
  useEffect(() => {
    fetch('http://localhost:3000/api/queue/list')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data fetched from queue:', data); // Para depurar
        setQueue(data); // Establece la cola en el estado
      })
      .catch((error) => {
        console.error('Error fetching queue:', error); // Muestra el error en consola
      });
  }, []);

  
  return (
    <div>
      <h1>Music Queue</h1>
      {queue.length > 0 ? (
        <ul>
          {queue.map((song, index) => (
            <li key={index}>
              <strong>{song.name}</strong> by {song.artist.map(artist => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs in the queue</p>
      )}
    </div>
  );
};



export default MusicQueue;