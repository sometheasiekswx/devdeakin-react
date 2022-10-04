import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import { randomIntFromInterval } from "../ulits"
import { firebaseDb } from "../firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"

import { Circle } from "@mui/icons-material"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from "@mui/material/Stack"
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'


const ChatsPageContent = (props) => {
    const [searchGroupChats, setSearchGroupChats] = useState('')
    const [groupChats, setGroupChats] = useState([])
    const [groupChatsFiltered, setGroupChatsFiltered] = useState(groupChats)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGroupChats = async () => {
            const q = query(collection(firebaseDb, 'group-chats'), orderBy('date_updated', 'desc'))
            const querySnapshot = await getDocs(q)
            const data = []
            querySnapshot.forEach((doc) => {
                const docData = doc.data()
                data.push({
                    id: doc.id,
                    title: docData['title'],
                    image: docData['image'],
                })
            })

            setGroupChats(data)
        }

        fetchGroupChats().then(r => console.log('Group chats loaded'))
    }, [])


    useEffect(() => {
        const filterGroupChats = () => {
            let searchSanitized = searchGroupChats.toLowerCase().trim()
            let newData = groupChats

            if (searchGroupChats !== '') {
                newData = groupChats.filter(x => x['title'].toLowerCase().trim().includes(searchSanitized))
            }
            setGroupChatsFiltered(newData)
        }
        filterGroupChats()
    }, [searchGroupChats, groupChats])

    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
                backgroundColor: 'primary.dark',
            },
            width: {xs: '100%'},
        }}>
            <Box sx={{
                width: {xs: '100%'},
                py: 4,
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Paper
                    component="form"
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: {xs: '100%', md: '50%'}}}
                >
                    <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                    <InputBase
                        onChange={e => setSearchGroupChats(e.target.value)}
                        value={searchGroupChats}
                        sx={{mx: 1, flex: 1}}
                        placeholder="Search groups"
                        inputProps={{'aria-label': 'search groups'}}
                    />
                </Paper>
            </Box>
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
                Group Chats
            </Typography>
            <Grid
                container
                sx={{pb: 4, width: {xs: '100%'}, pl: 2, pt: 2}}
                direction='row'
                justifyContent='center'
                alignItems='center'
                rowSpacing={{xs: 4}}
                columnSpacing={{xs: 2, md: 4}}
            >
                {groupChatsFiltered.slice(0, 4).map((d, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={`${d.title}-${d.author}-${index}`}>
                        <Link to={`/chat/${d.id}`}>
                            <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
                                {d.image &&
                                    <img
                                        loading={'lazy'}
                                        alt={`${d.title} ${d.image}`}
                                        src={d.image}
                                        style={{
                                            height: '140px',
                                            width: '140px',
                                            objectFit: 'cover',
                                            animation: `morphing${randomIntFromInterval(1, 3)} 12s infinite`
                                        }}
                                    />
                                }
                                <Stack direction={'row'} display={'flex'} justifyContent={'center'}
                                       alignItems={'center'}
                                       gap={1}>
                                    <Box>
                                        <Circle color={'success'} sx={{
                                            'display': 'flex',
                                            'justifyContent': 'center',
                                            'alignItems': 'center',
                                            'fontSize': '12px'
                                        }}/>
                                    </Box>
                                    <Box>
                                        <Typography gutterBottom variant='span' component='span' sx={{
                                            whiteSpace: 'nowrap', overflowX: 'auto', color: 'white',
                                        }}>
                                            {d.title}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{
                width: {xs: '100%'},
                py: 4,
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Paper
                    component="form"
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: {xs: '100%', md: '50%'}}}
                >
                    <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                    <InputBase
                        onChange={e => setSearchGroupChats(e.target.value)}
                        value={searchGroupChats}
                        sx={{mx: 1, flex: 1}}
                        placeholder="Search users"
                        inputProps={{'aria-label': 'search groups'}}
                    />
                </Paper>
            </Box>
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
                Private Messaging
            </Typography>
            <Grid
                container
                sx={{pb: 4, width: {xs: '100%'}, pl: 2, pt: 2}}
                direction='row'
                justifyContent='center'
                alignItems='center'
                rowSpacing={{xs: 4}}
                columnSpacing={{xs: 2, md: 4}}
            >
                <p>Users go here using admin sdk</p>
            </Grid>

        </Box>)
}

export default ChatsPageContent



