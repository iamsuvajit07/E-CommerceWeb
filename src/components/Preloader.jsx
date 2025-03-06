import React from 'react';
import 'ldrs/lineSpinner'

// Default values shown  


export default function Preloader() {
  return (
    <>
        <div className='loader'>
        <l-line-spinner size="100" stroke="6" speed="1.5" color="black" ></l-line-spinner>
        </div>
    </>
  );
}
