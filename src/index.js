import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FullScreen from './FullScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ErrorPage from './error-page';
import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
    {
        path: "/",
        element: <FullScreen/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "login",
        element: <LoginScreen />
    },
    {
        path: "signup",
        element: <SignupScreen />
    },
    {
        
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
