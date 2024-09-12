// src/components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <p>Loading...</p>
      {/* You can use a spinner or any other visual element */}
      <div className="spinner"></div>
      <style jsx>{`
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 20vh;
        }
        .spinner {
          border: 8px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 8px solid #3498db;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
