import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import CircularProgressWithLabel from "../components/CircularProgressWithLabel";

import { addDoc, collection } from "firebase/firestore";
import { firebaseDb, firebaseStorage, useFirebaseAuth } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import ErrorBox from "../components/ErrorBox";
import SuccessBox from "../components/SuccessBox";

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


const HomePage = () => {
    const user = useFirebaseAuth();
    const navigate = useNavigate()
    const {handleSubmit, control, formState: {errors}} = useForm()
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [postType, setPostType] = useState('question')
    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState('')
    const [fileUploadPercent, setFileUploadPercent] = useState(0);
    const [postTitlePlaceholder, setPostTitlePlaceholder] = useState('Start your question with how, what, why, etc.')

    const handleChangePostType = (event) => {
        setPostType(event.target.value)
    }

    const handleChangeUpload = (event) => {
        setFile(event.target.files[0]);
    }

    const onChangeCodeMirror = useCallback((value, viewUpdate) => {
        setCode(value)
    }, []);

    const controlProps = (item) => ({
        checked: postType === item,
        onChange: handleChangePostType,
        value: item,
        name: 'post-type-radio',
        inputProps: {'aria-label': item},
    })

    const handleUpload = () => {
        if (!file) {
            setError('Browse an image before uploading')
        } else if (file) {
            const storageRef = ref(firebaseStorage, `/images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setFileUploadPercent(percent);
                },
                (err) => setError(err.toString()),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setFileUrl(url);
                        setError('')
                    });
                }
            );
        }
    };

    const onSubmit = async data => {
        let author = "Anonymous"
        if (user !== null && user !== undefined) {
            author = user.displayName
        }
        if (postType === 'article') {
            try {
                const docRef = await addDoc(collection(firebaseDb, "articles"), {
                    'title': data.title,
                    'abstract': data.abstract,
                    'text': data.text,
                    'image': fileUrl,
                    'tags': data.tags.split(','),
                    'author': author,
                    'author_id': user.uid,
                    'date_created': (new Date()).toJSON(),
                    'date_updated': (new Date()).toJSON(),
                });
                setError('')
                setSuccess('Successfully created article')

                setTimeout(() => {
                    navigate('/articles')
                }, 500)
            } catch (e) {
                setError(`Error: ${e}`)
            }
        } else if (postType === 'question') {
            try {
                const docRef = await addDoc(collection(firebaseDb, "questions"), {
                    'title': data.title,
                    'problem': code,
                    'image': fileUrl,
                    'tags': data.tags.split(','),
                    'author': author,
                    'author_id': user.uid,
                    'date_created': (new Date()).toJSON(),
                    'date_updated': (new Date()).toJSON(),
                });
                setError('')
                setSuccess('Successfully created question')

                setTimeout(() => {
                    navigate('/questions')
                }, 500)
            } catch (e) {
                setError(`Error: ${e}`)
            }
        }
    }

    useEffect(() => {
        if (postType === 'question') {
            setPostTitlePlaceholder('Start your question with how, what, why, etc.')
        } else if (postType === 'article') {
            setPostTitlePlaceholder('Enter a descriptive title')
        }
    }, [postType])

    return (
        <>
            {error && <ErrorBox message={error}/>}
            {success && <SuccessBox message={success}/>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={0} direction='column'
                       justifyContent='center'
                       alignItems='center' sx={{m: 4, border: 2, borderColor: 'primary.main'}}>
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
                            New Post
                        </Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                        color: 'primary.main'
                    }}>
                        <FormControl sx={{px: 4, py: 2}}>
                            <FormLabel>
                                <Typography
                                    sx={{
                                        color: 'primary.main'
                                    }}
                                >
                                    Select post type
                                </Typography>
                            </FormLabel>
                            <RadioGroup row name='post-type-radio'>
                                <FormControlLabel value='question' control={<Radio   {...controlProps('question')}/>}
                                                  label='Question'/>
                                <FormControlLabel value='article' control={<Radio   {...controlProps('article')}/>}
                                                  label='Article'/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
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
                            What do you want to ask or share
                        </Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                    }}>
                        <Typography
                            sx={{
                                px: 4,
                                py: 2,
                                color: 'primary.main',
                            }}
                        >
                            This section is designed based on the type of the post. It could be developed by conditional
                            rendering.{' '}
                            <Typography
                                variant='span'
                                component={'span'}
                                sx={{
                                    color: 'secondary.main',
                                }}
                            >
                                For post a question, the following section would be appeared.
                            </Typography>
                        </Typography>
                    </Box>
                    <Box sx={{
                        px: 4,
                        py: 2,
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Typography variant='span' component={'span'}>
                            Title
                        </Typography>
                        <Controller
                            name='title'
                            defaultValue={''}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => <TextField fullWidth placeholder={postTitlePlaceholder} {...field}/>}
                        />
                    </Box>

                    <Box sx={{
                        px: 4,
                        py: 2,
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 4,
                    }}>
                        <Typography variant='span' component={'span'}>
                            Add an image
                        </Typography>
                        <TextField
                            variant="filled"
                            type="file" onChange={handleChangeUpload} accept="/image/*"
                        />
                        <Button size={'medium'} onClick={handleUpload} variant="contained">Upload</Button>
                        <CircularProgressWithLabel value={fileUploadPercent}/>
                    </Box>

                    {postType === 'question' ?
                        <>
                            <Box sx={{
                                px: 4,
                                py: 2,
                                backgroundColor: 'white',
                                width: {xs: '100%'},
                            }}>
                                <Typography
                                    variant='span'
                                    component={'span'}
                                >
                                    Describe your problem
                                </Typography>
                                <MDEditor
                                    style={{marginTop: '16px'}}
                                    height={200} value={code} onChange={setCode}
                                    previewOptions={{
                                        rehypePlugins: [[rehypeSanitize]],
                                    }}
                                />
                            </Box>
                        </>
                        : <>
                        </>}
                    {postType === 'article' ?
                        <>
                            <Box sx={{
                                px: 4,
                                py: 2,
                                backgroundColor: 'white',
                                width: {xs: '100%'},
                            }}>
                                <Typography
                                    variant='span'
                                    component={'span'}
                                >
                                    Abstract
                                </Typography>
                                <Controller
                                    name='abstract'
                                    defaultValue={''}
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) =>
                                        <TextField
                                            sx={{mt: 2,}}
                                            fullWidth
                                            multiline
                                            placeholder={'Enter a 1-paragraph abstract'}
                                            rows={2}
                                            {...field}
                                        />
                                    }
                                />
                            </Box>
                            <Box sx={{
                                px: 4,
                                py: 2,
                                backgroundColor: 'white',
                                width: {xs: '100%'},
                            }}>
                                <Typography
                                    variant='span'
                                    component={'span'}
                                >
                                    Article text
                                </Typography>
                                <Controller
                                    name='text'
                                    defaultValue={''}
                                    control={control}
                                    rules={{required: true}}
                                    render={({field}) =>
                                        <TextField
                                            sx={{mt: 2,}}
                                            fullWidth
                                            multiline
                                            placeholder={'Enter a 1-paragraph abstract'}
                                            rows={8}
                                            {...field}
                                        />
                                    }
                                />

                            </Box>
                        </>
                        : <></>}
                    <Box sx={{
                        px: 4,
                        py: 2,
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Typography variant='span' component={'span'}>
                            Tags
                        </Typography>
                        <Controller
                            name='tags'
                            defaultValue={''}
                            control={control}
                            rules={{required: true}}
                            render={({field}) =>
                                <TextField fullWidth
                                           placeholder={'Place up to 3 tags to describe what your article is about e.g., Java'}
                                           {...field}
                                />
                            }
                        />
                    </Box>
                    <Box sx={{
                        px: 4,
                        py: 2,
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Button size={'large'} variant='contained' type='submit'>Post</Button>
                    </Box>
                </Stack>
            </form>
        </>
    )
}

export default HomePage