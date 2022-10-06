import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Parallax } from "react-parallax";
import { TypeAnimation } from "react-type-animation";

import FeaturedCards from '../components/FeaturedCards'
import Subscribe from '../components/Subscribe'

import alteredCarbonWallpaper from '../images/altered-carbon-wallpaper.jpg'

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firebaseDb } from "../firebase";

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from "@mui/material/Typography";


const HomePage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [articles, setArticles] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const q = query(collection(firebaseDb, "articles"), orderBy("date_created", 'desc'), limit(3));
            const querySnapshot = await getDocs(q)
            const data = []
            querySnapshot.forEach((doc) => {
                const docData = doc.data()
                //TODO: Remove duplicated abstract field
                data.push({
                    id: doc.id,
                    description: docData['abstract'],
                    ...docData
                })
            });
            setArticles(data);
        }

        const fetchQuestions = async () => {
            const q = query(collection(firebaseDb, "questions"), orderBy("date_created", 'desc'), limit(3));
            const querySnapshot = await getDocs(q)
            const data = []
            querySnapshot.forEach((doc, index) => {
                const docData = doc.data()
                //TODO: Remove duplicated problem field
                data.push({
                    id: doc.id,
                    description: docData['problem'],
                    ...docData
                })
            });
            setQuestions(data);
        }

        if (searchParams.get('newuser') === 'true') {
            navigate('/')
            navigate(0)
        }

        fetchArticles().then(r => console.log('Articles loaded'))
        fetchQuestions().then(r => console.log('Questions loaded'))
    }, [navigate, searchParams])

    return (
        <Stack spacing={0} direction='column'
               justifyContent='center'
               alignItems='center'>
            <Box sx={{width: {xs: '100%'},}} alt='Altered carbon wallpaper'>
                <Parallax bgImage={alteredCarbonWallpaper} strength={300}>
                    <Box sx={{height: 600}}>
                        <Box sx={{
                            top: {xs: "90%", md: "50%",},
                            left: {xs: "0%", md: "0%",},
                            transform: {xs: "translate(-0%,-90%)", md: "translate(-0%,-50%)",},
                            position: "absolute"
                        }}>
                            <Typography
                                variant='h1'
                                sx={{
                                    py: 2,
                                    px: 4,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    fontSize: {xs: '1.5rem', md: '2rem'},
                                    color: 'secondary.light',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <TypeAnimation
                                    sequence={[
                                        'Made by Somethea Siek',
                                        6000,
                                        'Enjoy the site!',
                                        3000,
                                        () => {
                                            console.log('Done typing!');
                                        }
                                    ]}
                                    speed={10}
                                    cursor={true}
                                    repeat={Infinity}
                                />
                            </Typography>
                        </Box>
                    </Box>
                </Parallax>
            </Box>

            <FeaturedCards title={'Featured questions'} link={'/questions'} data={questions}/>
            <Divider/>
            <FeaturedCards title={'Featured articles'} link={'/articles'} data={articles}/>

            <Subscribe/>
        </Stack>
    )
}

export default HomePage