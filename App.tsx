import React from 'react';
import AppNavigation from './navigation/StackNavigator';
import { Bounce, ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <AppNavigation />
    </>
  );
}
