import React from 'react';
import Header from '../Components/Header';
import { Outlet, Navigate } from "react-router-dom"

export default function ReportPage({ setCaja, setIsOpenBox, handlerNotification }) {

  const token = sessionStorage.getItem('token');

  if (!token) return (<Navigate to="/" />)
  return (
    <>
      <Header setCaja={setCaja} setIsOpenBox={setIsOpenBox} handlerNotification={handlerNotification} />
      <div>
        <Outlet />
      </div>
    </>

  );
}
