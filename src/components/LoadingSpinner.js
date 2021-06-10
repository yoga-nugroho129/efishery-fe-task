import React from 'react';
import { Loading } from '../assets'

const spinnerStyle = {
  paddingTop: '10%',
  paddingBottom: '10%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const LoadingSpinner = () => {
  return (
    <div className="spinner" style={spinnerStyle}>
      <img src={Loading} alt="Loading..." className="w-20" />
    </div>
  );
}

export default LoadingSpinner;
