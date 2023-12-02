'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// 클라이언트 컴포넌트만 가능
// 토스티파이 css를 불러온다
const ToastProvider = () => {
  return <ToastContainer autoClose={1000} />;
};

export default ToastProvider;
