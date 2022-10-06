import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useFirebaseAuth } from './firebase'

import { loadStripe } from '@stripe/stripe-js'
import { Elements, } from '@stripe/react-stripe-js'


import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import PostPage from './pages/PostPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotfoundPage from './pages/NotfoundPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionPage from './pages/QuestionPage'
import ChatsPage from './pages/ChatsPage'
import ChatPage from './pages/ChatPage'
import PricingPlansPage from './pages/PricingPlansPage'
import PricingPlansPremiumPage from './pages/PricingPlansPremiumPage'
import PricingPlansPremiumSuccessPage from './pages/PricingPlansPremiumSuccessPage'
import PricingPlansPremiumCancelPage from './pages/PricingPlansPremiumCancelPage'
// import ArticlesPage from './pages/ArticlesPage'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const theme = createTheme({
    palette: {
        type: 'light', primary: {
            main: '#353e99',
        }, secondary: {
            main: '#f33d68',
        }, warning: {
            main: '#6a2762',
        }, info: {
            main: '#82f2fd',
        },
    }, typography: {
        fontFamily: 'Montserrat',
    }
})

function App() {
    const user = useFirebaseAuth()

    return (
        <BrowserRouter>
            <Elements stripe={stripePromise}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Header/>
                    <Routes>
                        <Route exact path='/' element={<HomePage/>}/>

                        {/*<Route exact path='/articles' element={<ArticlesPage/>}>*/}
                        {/*</Route>*/}
                        <Route exact path='/questions' element={<QuestionsPage/>}/>
                        <Route exact path='/questions/:questionId' element={<QuestionPage/>}/>

                        <Route exact path='/chat' element={<ChatsPage/>}/>
                        {user && <Route exact path='/chat/:chatId' element={<ChatPage/>}/>}

                        <Route exact path='/plans' element={<PricingPlansPage/>}/>
                        <Route exact path='/plans/premium' element={<PricingPlansPremiumPage/>}/>
                        <Route exact path='/plans/premium/success' element={<PricingPlansPremiumSuccessPage/>}/>
                        <Route exact path='/plans/premium/cancel' element={<PricingPlansPremiumCancelPage/>}/>

                        <Route exact path='/post' element={<PostPage/>}/>

                        <Route exact path='/login' element={<LoginPage/>}/>
                        <Route exact path='/signin' element={<LoginPage/>}/>
                        <Route exact path='/sign-in' element={<LoginPage/>}/>

                        <Route exact path='/signup' element={<SignupPage/>}/>

                        <Route path='*' element={<NotfoundPage/>}/>
                    </Routes>
                    <Footer/>
                </ThemeProvider>
            </Elements>
        </BrowserRouter>
    )
}

export default App
