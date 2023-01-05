import React from 'react';
import Header from '../Components/Header';
import { Outlet, Navigate } from "react-router-dom"

export default function ReportPage({ handlerNotification }) {

  const token = sessionStorage.getItem('token');

  if (!token) return (<Navigate to="/" />)
  return (
    <>
      <Header handlerNotification={handlerNotification} />
      <div>
        <Outlet />
      </div>
    </>

  );
}
