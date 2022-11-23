import React from 'react';
import '../styles/action.css'

export default function Action({children, text}) {
    return <button className='action'>
        {children}
        <p>{text}</p>
    </button>
};
