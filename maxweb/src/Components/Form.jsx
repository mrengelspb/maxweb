import React from 'react';
import '../styles/form.css'

export default function Form({children}) {
    return (<form className='form--content'>
        {children}
    </form>)
}