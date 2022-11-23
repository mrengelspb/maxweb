import React from 'react';
import '../styles/input.css'

export default function Input({placeholder, type}){
    return <input className='form--input' 
                         type={type} id='' name='' 
                         placeholder={placeholder}/>
}