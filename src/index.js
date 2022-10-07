import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App'

import reportWebVitals from './reportWebVitals'

import { FirebaseAuthProvider } from './firebase'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<React.StrictMode>
    <FirebaseAuthProvider>
        <Elements stripe={stripePromise}>
            <App/>
        </Elements>
    </FirebaseAuthProvider>
</React.StrictMode>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
