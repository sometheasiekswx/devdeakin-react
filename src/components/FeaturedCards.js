import React from 'react'

import { useNavigate } from 'react-router-dom'

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from "@mui/material/Divider";

import { useFirebaseAuth } from "../firebase";


const FeaturedCards = (props) => {
    const user = useFirebaseAuth()
    const navigate = useNavigate()
    const {title, link, data} = props

    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
                backgroundColor: 'primary.dark',
            },
            width: {xs: '100%'},
        }}>
            <Typography
                variant='h4'
                component={'h4'}
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
                {title}
            </Typography>
            <Grid
                container
                sx={{pb: 4, width: {xs: '100%'}, pl: 2}}
                direction='row'
                justifyContent='center'
                alignItems='center'
                rowSpacing={{xs: 2}}
                columnSpacing={{xs: 2, lg: 4}}
            >
                {data.map((d, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={`${d.title}-${d.author}-${index}`}>
                        <Card>
                            {d.image && <CardMedia
                                component='img'
                                alt={`${d.title} ${d.image}`}
                                height='140'
                                image={d.image}
                            />}

                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div' sx={{
                                    whiteSpace: 'nowrap', overflowX: 'auto',
                                }}>
                                    {d.title}
                                </Typography>
                                <MDEditor.Markdown
                                    style={{
                                        // fontSize: '1.2rem',
                                        // padding: '16px',
                                        fontWeight: 400,
                                        fontFamily: 'Montserrat',
                                    }}
                                    source={d.description.length < 75 ? d.description : `${d.description.slice(0, 75)}...`}
                                    linkTarget="_blank"
                                    previewOptions={{
                                        rehypePlugins: [[rehypeSanitize]],
                                    }}
                                />
                                <Grid container
                                      sx={{mt: 2}}
                                      justifyContent='center'
                                      alignItems='center'>
                                    <Grid item xs={8} sx={{
                                        display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                                    }}>
                                        <Stack direction={'row'} sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                            <Typography>
                                                Tags
                                            </Typography>
                                            <Divider orientation="vertical" flexItem
                                                     sx={{backgroundColor: 'primary.main'}}/>
                                            <Typography variant='body2' color='text.secondary'>
                                                {d.tags.map((tag, i) => {
                                                        let tagDisplayed = tag
                                                        if (tag.length > 10) {
                                                            tagDisplayed = tag.slice(0, 10)
                                                        }
                                                        if (i < d.tags.length - 1) {
                                                            return `${tagDisplayed},`
                                                        } else {
                                                            return tagDisplayed
                                                        }
                                                    }
                                                )}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sx={{textAlign: 'right'}} color={'primary'}>
                                        {d.author}
                                    </Grid>
                                </Grid>
                                <Grid container
                                      sx={{mt: 2}}
                                      justifyContent='space-between'
                                      alignItems='center' gap={1}>

                                    {user !== null && user !== undefined && d.author_id === user.uid ?
                                        <>
                                            <Grid item xs={5}>
                                                <Button variant={'contained'} fullWidth
                                                        onClick={() => navigate(`/questions/${d.id}`)}>Read</Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant={'outlined'} fullWidth>Edit</Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant={'outlined'} color={'secondary'}
                                                        fullWidth>Delete</Button>
                                            </Grid>
                                        </> :
                                        <Grid item xs={12}>
                                            <Button variant={'contained'} fullWidth
                                                    onClick={() => navigate(`/questions/${d.id}`)}>Read</Button>
                                        </Grid>
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>))}
            </Grid>
            <Box
                component='div'
                sx={{
                    pb: 4, display: 'flex', justifyContent: 'center',
                }}>
                <Button variant='contained' color='secondary' onClick={() => {
                    navigate(link)
                }}>See all {title.replace('Featured', '')}</Button>
            </Box>
        </Box>)
}

export default FeaturedCards



