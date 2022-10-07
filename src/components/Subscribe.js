import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from "react-hook-form"
import { postSubscriber } from "../api"
import SuccessBox from "./SuccessBox"


const Subscribe = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        const result = await postSubscriber(data.email)
        if (result.status === 200) {
            setSuccess(result.data)
        }
        setTimeout(() => {
            setSuccess('')
        }, 2000)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {success && <SuccessBox message={success} sx={{m: 0}}/>}
            <Box sx={{
                width: {xs: '100%'},
                py: 1,
                display: 'flex',
                justifyContent: {xs: 'space-around', sm: 'center'},
                alignItems: 'center',
                gap: {sm: 4}
            }}>

                <Typography
                    variant='h6'
                    component={'h6'}
                    href='/'
                    sx={{
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontWeight: 500,
                        letterSpacing: '.1rem',
                        textDecoration: 'none',
                        display: {xs: 'none', md: 'flex'}
                    }}
                >
                    SIGN UP FOR OUT DAILY INSIDER
                </Typography>
                <TextField label='Enter your email' variant='outlined' size='small' {...register("email")}/>
                <Button variant='contained' type={'submit'}>Subscribe</Button>
            </Box>
        </form>
    )
}

export default Subscribe