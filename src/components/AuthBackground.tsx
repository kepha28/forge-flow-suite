
import React from 'react';
import Hero from './Hero';

const AuthBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <div className="absolute inset-0 backdrop-blur-md bg-black/20">
        <Hero />
      </div>
    </div>
  );
};

export default AuthBackground;
