import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import ErrorBox from '../components/ErrorBox'
import SuccessBox from '../components/SuccessBox'

import { firebaseAuth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


const LoginPage = () => {
    const navigate = useNavigate()
    const {handleSubmit, control, formState: {errors}} = useForm()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const onSubmit = data => {
        signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                setSuccess('Successfully created account')
                setTimeout(() => {
                    navigate('/')
                }, 500)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setError(`${errorCode} - ${errorMessage}`)
            })
    }
    return (
        <>
            <Stack spacing={0} direction='column'
                   justifyContent='center'
                   alignItems='center' sx={{mt: 4, mx: 1}}>
                <Box sx={{
                    backgroundColor: 'white',
                    width: {xs: '100%'},
                    textAlign: 'right'
                }}>
                    <Typography
                        sx={{
                            px: 4,
                            py: 2,
                            color: 'primary.main',
                        }}
                    >
                        Do not have an account?
                        <Button variant='outlined' sx={{ml: 2}} onClick={() => navigate('/signup')}>Sign up</Button>
                    </Typography>
                </Box>
            </Stack>
            {
                errors && errors.email ? <ErrorBox message={errors.email.message}/> : <></>
            }
            {
                error ? <ErrorBox message={error}/> : <></>
            }
            {
                success ? <SuccessBox message={success}/> : <></>
            }
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
                            Login
                        </Typography>
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
                            color={'primary'}
                        >
                            Your email
                        </Typography>
                        <Controller
                            name='email'
                            defaultValue = {''}
                            control={control}
                            rules={{
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'invalid email address'
                                }
                            }}
                            render={({field}) => <TextField sx={{mt: 2,}} fullWidth {...field} />}
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
                            color={'primary'}
                        >
                            Your password
                        </Typography>
                        <Controller
                            name='password'
                            defaultValue = {''}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => <TextField type='password' sx={{mt: 2,}} fullWidth {...field} />}
                        />
                    </Box>
                    <Box sx={{
                        px: 4,
                        py: 4,
                        backgroundColor: 'white',
                        width: {xs: '100%'},
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Button type='submit' variant='contained' fullWidth size='large'>Login</Button>
                    </Box>
                </Stack>
            </form>
        </>
    )
}

export default LoginPage