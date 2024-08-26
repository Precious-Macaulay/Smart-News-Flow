import React, { useEffect } from 'react';

const NewsFlow = ({ onNavigate, data }) => {
  const { email, prompt } = data;


  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_WS_BASE_URL}?userId=${email}&prompt=${prompt}`);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Data received from server:', data);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="news-flow">

      <div className="nav">
      <h2>Smart News Flow</h2>
        <button onClick={() => onNavigate('search', { email })}>Back to Search</button>
      </div>
        <h2>
          {prompt}?
        </h2>
    </div>
  );
};

export default NewsFlow;