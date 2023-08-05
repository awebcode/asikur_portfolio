import React from 'react'

const Error = ({ statusCode }) => {
  return (
    <div className="customerror">
          <h1>Ooopss {statusCode}! No Blog Found.😭😢</h1>
    </div>
  );
};

export default Error