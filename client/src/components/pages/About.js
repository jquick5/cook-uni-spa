import React from 'react';

const About = () => {
  return (
    <div
      style={{ marginBottom: '548px', opacity: 0.9 }}
      className='card bg-dark text-dark op'
    >
      <h1>About This App</h1>
      <p className='my-1 lead'>
        This is a full stack React app for sharing recipes
      </p>
      <p className='p'>
        <strong>Version:</strong>1.0.0
      </p>
    </div>
  );
};

export default About;
