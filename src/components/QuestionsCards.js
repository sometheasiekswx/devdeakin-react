import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItem from '@mui/material/MenuItem';

import { firebaseDb, useFirebaseAuth } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";

import { filterTags } from "../ulits";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const QuestionsCards = (props) => {
    const user = useFirebaseAuth()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const {title, data, setData} = props
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('title')
    const [dataFiltered, setDataFiltered] = useState(data)
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleCloseNavMenu = (f) => {
        setAnchorElNav(null)
        setFilter(f)
    }

    useEffect(() => {
        let searchSanitized = search.toLowerCase().trim()
        let newData = data

        if (search !== '') {
            if (filter === 'tags') {
                try {
                    newData = filterTags(searchSanitized, data)
                } catch (e) {
                    console.log(e)
                }
            } else if (filter === 'date') {
                try {
                    newData = data.filter(x => x.date_created.toString().toLowerCase().trim().includes(searchSanitized))
                } catch (e) {
                    console.log(e)
                }
            } else {
                try {
                    newData = data.filter(x => x[filter].toLowerCase().trim().includes(searchSanitized))
                } catch (e) {
                    console.log(e)
                }
            }
        }
        setDataFiltered(newData)
    }, [search, data, filter])

    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
                backgroundColor: 'primary.dark',
            },
            width: {xs: '100%'},
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
                {title}
            </Typography>

            <Box sx={{
                width: {xs: '100%'},
                pb: 4,
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Paper
                    component="form"
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: {xs: '100%', md: '50%'}}}
                >
                    <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                    <InputBase
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        sx={{mx: 1, flex: 1}}
                        placeholder="Search questions"
                        inputProps={{'aria-label': 'search questions'}}
                    />
                    <Typography variant={'body1'} color={'gray'}>
                        by {filter}
                    </Typography>
                    <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>

                    <IconButton
                        onClick={handleOpenNavMenu}
                        color='inherit'
                    >
                        <FilterListIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <MenuItem onClick={() => handleCloseNavMenu('title')}>
                            <Typography textAlign='center'>Title</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => handleCloseNavMenu('problem')}>
                            <Typography textAlign='center'>Description</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => handleCloseNavMenu('tags')}>
                            <Typography textAlign='center'>Tags</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => handleCloseNavMenu('date')}>
                            <Typography textAlign='center'>Date</Typography>
                        </MenuItem>
                    </Menu>
                </Paper>
            </Box>
            <Grid
                container
                sx={{pb: 4, width: {xs: '100%'}, pl: 2}}
                direction='row'
                justifyContent='center'
                alignItems='center'
                rowSpacing={{xs: 4}}
                columnSpacing={{xs: 2, md: 4}}
            >
                {dataFiltered.map((d, index) => (
                    <Grid item xs={12} md={6} lg={4} key={`${d.title}-${d.author}-${index}`}>
                        <Card>
                            {d.image &&
                                <CardMedia
                                    component='img'
                                    alt={`${d.title} ${d.image}`}
                                    height='140'
                                    image={d.image}
                                />
                            }

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
                                    source={d.problem.length < 200 ? d.problem : `${d.problem.slice(0, 200)}...`}
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
                                            <Typography variant='body1' color='text.secondary'>
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
                                                <Button variant={'outlined'} color={'secondary'} onClick={async () => {
                                                    await deleteDoc(doc(firebaseDb, 'questions', d.id)).then(
                                                        setData((q) => q.filter((_, i) => i !== index))
                                                    )
                                                }} fullWidth>Delete</Button>
                                            </Grid>
                                        </> :
                                        <Grid item xs={12}>
                                            <Button variant={'contained'} fullWidth
                                                    onClick={() => navigate(`/questions/${d.id}`)}>Read</Button>
                                        </Grid>
                                    }
                                </Grid>

                                <Typography sx={{mt: 2}} variant='body2' color='text.secondary'>
                                    Posted {d.date_created.toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Box>)
}

export default QuestionsCards



