import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { firebaseDb, useFirebaseAuth } from '../firebase'
import { collection, deleteDoc, doc, documentId, getDocs, query, where } from 'firebase/firestore'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { ArrowBack } from '@mui/icons-material'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'


const QuestionPage = () => {
    const user = useFirebaseAuth()
    const navigate = useNavigate()
    const {questionId} = useParams()
    const [question, setQuestion] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const q = query(
                collection(firebaseDb, 'questions',),
                where(documentId(), '==', questionId)
            )
            const querySnapshot = await getDocs(q)
            let data = {}
            querySnapshot.forEach((doc) => {
                const docData = doc.data()
                data = {
                    id: doc.id,
                    ...docData
                }
            })

            setQuestion(data)
        }

        fetchData()
    }, [questionId])

    return (
        <Stack spacing={0} direction='column'
               justifyContent='center'
               alignItems='center'>
            <Box sx={{
                backgroundColor: 'primary.main',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                },
                width: {xs: '100%'},
                py: {xs: 0, md: 4}
            }}>
                {Object.keys(question).length !== 0 &&
                    <>
                        <Typography
                            variant='h2'
                            component={'h2'}
                            href='/'
                            sx={{
                                my: 0,
                                pt: 2,
                                pb: {xs: 2, md: 6},
                                fontSize: {xs: '2.5rem', md: '3rem', lg: '3.5rem'},
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            {question.title}
                        </Typography>
                        <Grid
                            container
                            sx={{pb: 4, width: {xs: '100%'}, pl: 2}}
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            rowSpacing={{xs: 4}}
                            columnSpacing={{xs: 2, md: 4}}
                        >
                            <Grid item xs={12} md={10} lg={8} xl={6}>
                                <Card>
                                    {question.image &&
                                        <CardMedia
                                            component='img'
                                            alt={`${question.title} ${question.image}`}
                                            height='300'
                                            image={question.image}
                                        />
                                    }
                                    <CardContent>
                                        <MDEditor.Markdown
                                            style={{
                                                fontSize: '1.2rem',
                                                padding: '16px',
                                                fontWeight: 400,
                                                fontFamily: 'Montserrat',
                                            }}
                                            source={question.problem}
                                            linkTarget='_blank'
                                            previewOptions={{
                                                rehypePlugins: [[rehypeSanitize]],
                                            }}
                                        />
                                        <Grid container
                                              sx={{p: 2}}
                                              justifyContent='center'
                                              alignItems='center'>
                                            <Grid item xs={8} sx={{
                                                display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                                            }}>
                                                <Stack direction={'row'}
                                                       sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                                    <Typography sx={{fontSize: {xs: '1rem', md: '1.25rem'}}}>
                                                        Tags
                                                    </Typography>
                                                    <Divider orientation='vertical' flexItem
                                                             sx={{backgroundColor: 'primary.main'}}/>
                                                    <Typography variant='body1' color='text.secondary'
                                                                sx={{fontSize: {xs: '1rem', md: '1.25rem'}}}>
                                                        {question.tags.map((tag, i) => {
                                                                if (i < question.tags.length - 1) {
                                                                    return `${tag},`
                                                                } else {
                                                                    return tag
                                                                }
                                                            }
                                                        )}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={4}
                                                  sx={{textAlign: 'right', fontSize: {xs: '1rem', md: '1.25rem'}}}
                                                  color={'primary'}>
                                                {question.author}
                                            </Grid>
                                        </Grid>
                                        <Grid container
                                              sx={{p: 2}}
                                              justifyContent='space-between'
                                              alignItems='center' gap={1}>
                                            {user !== null && user !== undefined && question.author_id === user.uid ?
                                                <>
                                                    <Grid item xs={5}>
                                                        <Button size={'large'} variant={'contained'} fullWidth
                                                                onClick={() => navigate(`/questions`)}
                                                                startIcon={<ArrowBack/>}>Questions</Button>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Button size={'large'} variant={'outlined'}
                                                                fullWidth>Edit</Button>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Button size={'large'} variant={'outlined'} color={'secondary'}
                                                                onClick={async () => {
                                                                    await deleteDoc(doc(firebaseDb, 'questions', question.id)).then(
                                                                        navigate(`/questions`)
                                                                    )
                                                                }} fullWidth>Delete</Button>
                                                    </Grid>

                                                </> : <Grid item xs={12}>
                                                    <Button size={'large'} variant={'contained'} fullWidth
                                                            onClick={() => navigate(`/questions`)}
                                                            startIcon={<ArrowBack/>}>Questions</Button>
                                                </Grid>
                                            }


                                        </Grid>
                                        <Typography sx={{p: 2, fontSize: {xs: '1rem', md: '1.2rem'}}} variant='body2'
                                                    color='text.secondary'>
                                            Posted {question.date_created.toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                }
            </Box>
        </Stack>
    )
}

export default QuestionPage