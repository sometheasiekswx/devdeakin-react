import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'


const Subscribe = () => {
    return (
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
            <TextField label='Enter your email' variant='outlined' size='small' />
            <Button variant='contained'>Subscribe</Button>
        </Box>
    )
}

export default Subscribe