import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import PostPage from './pages/PostPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotfoundPage from './pages/NotfoundPage';
// import ArticlesPage from "./pages/ArticlesPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuestionPage from "./pages/QuestionPage";

import { FirebaseAuthProvider } from "./firebase";


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
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <FirebaseAuthProvider>
                    <CssBaseline/>
                    <Header/>
                    <Routes>
                        <Route exact path='/' element={<HomePage/>}/>

                        {/*<Route exact path='/articles' element={<ArticlesPage/>}>*/}
                        {/*</Route>*/}
                        <Route exact path='/questions' element={<QuestionsPage/>}/>
                        <Route exact path="/questions/:questionId" element={<QuestionPage/>}/>

                        <Route exact path='/post' element={<PostPage/>}/>

                        <Route exact path='/login' element={<LoginPage/>}/>
                        <Route exact path='/signin' element={<LoginPage/>}/>
                        <Route exact path='/sign-in' element={<LoginPage/>}/>

                        <Route exact path='/signup' element={<SignupPage/>}/>

                        <Route path='*' element={<NotfoundPage/>}/>
                    </Routes>
                    <Footer/>
                </FirebaseAuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
