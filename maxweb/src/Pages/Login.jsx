import React from 'react';
import Form from '../Components/Form';
import Title from '../Components/Title';
import Input from '../Components/Input';
import Button from '../Components/Button';
import '../styles/login.css'

export default function Login() {
    return (<main className="login">
        <Form>
            <Title text="MawWellPOS"></Title>
            <Input placeholder='Nombre de Usuario' type='text'/>
            <Input placeholder='Contraseña' type='password'/>
            <Button text="Ingresar"></Button>
        </Form>
    </main>)
}
