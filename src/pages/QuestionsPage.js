import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'

import { firebaseDb } from "../firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import QuestionsCards from "../components/QuestionsCards";
import { Parallax } from "react-parallax";
import wallpaper from "../images/cyberpunk-wallpaper.jpg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TypeAnimation } from "react-type-animation";



const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(firebaseDb, "questions"), orderBy("date_created", 'desc'));
            const querySnapshot = await getDocs(q)
            const data = [];
            querySnapshot.forEach((doc) => {
                const docData = doc.data()
                data.push({
                    id: doc.id,
                    title: docData['title'],
                    image: docData['image'],
                    problem: docData['problem'],
                    tags: docData['tags'],
                    author: docData['author'],
                    date_created: new Date(docData['date_created']),
                    date_updated: new Date(docData['date_updated']),
                })
            });

            setQuestions(data);
        }

        fetchData()
    }, [])

    return (
        <Stack spacing={0} direction='column'
               justifyContent='center'
               alignItems='center'>

            <Box sx={{width: {xs: '100%'},}} alt='Altered carbon wallpaper'>
                <Parallax bgImage={wallpaper} strength={500}>
                    <Box sx={{height: 250}}>
                        <Box sx={{
                            top: {xs: "50%",},
                            left: {xs: "50%",},
                            transform: {xs: "translate(-50%,-50%)",},
                            position: "absolute"
                        }}>
                            <Typography
                                variant='h2'
                                component={'h2'}
                                href='/'
                                sx={{
                                    my: 0,
                                    py: 2,
                                    textAlign: 'center',
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    letterSpacing: '.1rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                <TypeAnimation
                                    sequence={[
                                        'Questions',
                                        () => {
                                            console.log('Done typing!');
                                        }
                                    ]}
                                    speed={10}
                                    cursor={true}
                                />

                            </Typography>
                        </Box>
                    </Box>
                </Parallax>
            </Box>

            <QuestionsCards data={questions} setData={setQuestions}/>
        </Stack>
    )
}

export default QuestionsPage