import React from 'react';
 
const Loading = () => (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <div className="loader"></div> {/* Customize this to your loading spinner */}
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
  
export default Loading;