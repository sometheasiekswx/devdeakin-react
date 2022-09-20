import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import ErrorBox from '../components/ErrorBox'
import SuccessBox from '../components/SuccessBox'

import { firebaseAuth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { AutoAwesome } from '@mui/icons-material'


const SignupPage = () => {
    const navigate = useNavigate()
    const {handleSubmit, control, formState: {errors}} = useForm()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const onSubmit = data => {
        createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                updateProfile(user, {
                    displayName: data.name,
                    photoURL: `https://avatars.dicebear.com/api/bottts/${user.uid}.svg`,
                })
                setSuccess('Successfully created account')
                setTimeout(() => {
                    // navigate(0)
                    navigate({
                        pathname: '/',
                        search: createSearchParams({
                            newuser: true
                        }).toString()
                    })
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
                        Already have an account?
                        <Button variant='outlined' sx={{ml: 2}} onClick={() => navigate('/login')}>Login</Button>
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
                            Create a DEV@Deakin Account
                        </Typography>
                    </Box>
                    <Grid container spacing={0}
                          sx={{
                              px: 4,
                              py: 2,
                          }}
                    >
                        <Grid item xs={4} sm={3}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                              }}
                        >
                            <Typography color={'primary'} variant='span' component={'span'}
                                        sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>
                                Name <AutoAwesome sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}} color={'primary'}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9}>
                            <Controller
                                name='name'
                                defaultValue={''}
                                control={control}
                                rules={{required: true}}
                                render={({field}) => <TextField fullWidth {...field} />}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}
                          sx={{
                              px: 4,
                              py: 2,
                          }}
                    >
                        <Grid item xs={4} sm={3}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                              }}
                        >
                            <Typography color={'primary'} variant='span' component={'span'}
                                        sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>
                                Email <AutoAwesome sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}} color={'primary'}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9}>
                            <Controller
                                name='email'
                                defaultValue={''}
                                control={control}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'invalid email address'
                                    }
                                }}
                                render={({field}) => <TextField fullWidth {...field} />}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}
                          sx={{
                              px: 4,
                              py: 2,
                          }}
                    >
                        <Grid item xs={4} sm={3}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                              }}
                        >
                            <Typography color={'primary'} variant='span' component={'span'}
                                        sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>
                                Password <AutoAwesome sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}} color={'primary'}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9}>
                            <Controller
                                name='password'
                                defaultValue={''}
                                control={control}
                                rules={{required: true}}
                                render={({field}) => <TextField type='password' fullWidth {...field} />}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}
                          sx={{
                              px: 4,
                              py: 2,
                          }}
                    >
                        <Grid item xs={4} sm={3}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                              }}
                        >
                            <Typography color={'primary'} variant='span' component={'span'}
                                        sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}>
                                Confirm password <AutoAwesome sx={{fontSize: {xs: '0.75rem', sm: '1rem'}}}
                                                              color={'primary'}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9}>
                            <Controller
                                name='confirm-password'
                                defaultValue={''}
                                control={control}
                                rules={{required: true,}}
                                render={({field}) => <TextField type='password' fullWidth {...field} />}
                            />
                        </Grid>
                    </Grid>
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
                        <Button type='submit' variant='contained' fullWidth size='large'>Create</Button>
                    </Box>

                </Stack>
            </form>
        </>
    )
}

export default SignupPage