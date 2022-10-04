import React, { useEffect, useState } from 'react'
import { Parallax } from 'react-parallax'

import wallpaper from '../images/wallpaperflare.com_wallpaper.jpg'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { addDoc, collection, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firebaseDb, useFirebaseAuth, } from "../firebase";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import ChatMessage from "../components/ChatMessage";


const ChatPage = () => {
    const user = useFirebaseAuth();
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const {handleSubmit, control, formState: {errors}} = useForm()
    const {chatId} = useParams();

    const [searchGroupChats, setSearchGroupChats] = useState('')
    const [groupChat, setGroupChat] = useState([])
    const [groupChatsFiltered, setGroupChatsFiltered] = useState(groupChat)

    const onSubmit = async data => {
        let author = "Anonymous"
        let profileImage = ''
        let authorId = ''
        if (user !== null && user !== undefined) {
            author = user.displayName
            profileImage = user.photoURL
            authorId = user.uid
        }

        try {
            const docRef = doc(firebaseDb, "group-chats", chatId);
            await updateDoc(docRef, {
                messages: arrayUnion({
                    text: data.message,
                    author: author,
                    authorId: authorId,
                    image: profileImage,
                    date_created: (new Date()).toJSON(),
                    date_updated: (new Date()).toJSON(),
                })
            });
            setSuccess('Message sent')
            setError('')
        } catch (e) {
            setError(`Error: ${e}`)
        }
    }

    useEffect(() => {
        const fetchGroupChats = async () => {
            const docRef = doc(firebaseDb, "group-chats", chatId);
            const docSnap = await getDoc(docRef)
            setGroupChat(docSnap.data())
        }

        fetchGroupChats().then(r => console.log('Group chats loaded'))
    }, [success])

    return (
        <>
            <Box sx={{width: {xs: '100%'}, position: 'absolute', zIndex: -1}} alt='Altered carbon wallpaper'>
                <Parallax bgImage={wallpaper} strength={500}>
                    <Box sx={{height: 250}}>
                        <Box sx={{
                            top: {xs: '50%',},
                            left: {xs: '50%',},
                            transform: {xs: 'translate(-50%,-50%)',},
                            position: 'absolute'
                        }}>
                        </Box>
                    </Box>
                </Parallax>
            </Box>

            {console.log(user.uid)}

            <Stack spacing={0} direction='column'
                   justifyContent='center'
                   alignItems='center' sx={{m: 4, border: 2, borderColor: 'primary.main', backgroundColor: 'white'}}>
                <Box sx={{
                    backgroundColor: 'primary.main',
                    width: {xs: '100%'},
                }}>
                    <Typography
                        variant='h6'
                        component={'h6'}
                        href='/'
                        sx={{
                            my: 0,
                            py: 2,
                            px: 4,
                            textAlign: 'left',
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            fontSize: {xs: '1rem', md: '1.25rem'},
                            letterSpacing: '.1rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        {groupChat.title}
                    </Typography>
                </Box>

                <Box width={'100%'} height={'100%'}>
                    {console.log(groupChat.messages)}
                    {groupChat.messages?.map((message)=>{
                        if (message.authorId === user.uid) {
                            return (
                                <ChatMessage
                                    side={'right'}
                                    messages={[message.text]}
                                />
                            )
                        }
                        return (

                            <ChatMessage
                                avatar={message.image}
                                messages={[message.text]}
                            />
                        )
                    })}
                    {/*<ChatMessage*/}
                    {/*    avatar={''}*/}
                    {/*    messages={[*/}
                    {/*        'Hi Jenny, How r u today?',*/}
                    {/*        'Did you train yesterday',*/}
                    {/*        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    {/*<ChatMessage*/}
                    {/*    side={'right'}*/}
                    {/*    messages={[*/}
                    {/*        "Great! What's about you?",*/}
                    {/*        'Of course I did. Speaking of which check this out',*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    {/*<ChatMessage avatar={''} messages={['Im good.', 'See u later.']}/>*/}
                    {/*<ChatMessage*/}
                    {/*    side={'right'}*/}
                    {/*    messages={[*/}
                    {/*        "Great! What's about you?",*/}
                    {/*        'Of course I did. Speaking of which check this out',*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    {/*<ChatMessage avatar={''} messages={['Im good.', 'See u later.']}/>*/}
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
                    <Box sx={{
                        px: 4,
                        py: 2,
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Controller
                            name='message'
                            defaultValue={''}
                            control={control}
                            rules={{required: true}}
                            render={({field}) =>
                                <TextField
                                    fullWidth
                                    multiline
                                    {...field}
                                />
                            }
                        />

                        <Button size={'large'} variant='contained' type='submit' sx={{whiteSpace: 'nowrap', px: 4,}}>Send
                            Message</Button>
                    </Box>
                </form>
            </Stack>
        </>
    )
}

export default ChatPage