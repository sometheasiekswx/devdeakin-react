import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'


const SuccessBox = (props) => {
    const {message, sx} = props
    return (
        <Stack spacing={0} direction='column'
               justifyContent='center'
               alignItems='center' sx={{m: 4, border: 2, borderColor: 'success.main', ...sx}}>
            <Box sx={{
                backgroundColor: 'success.main',
                width: {xs: '100%'},
            }}>
                <Typography
                    variant='p'
                    component={'p'}
                    href='/'
                    sx={{
                        my: 0,
                        py: 2,
                        px: 4,
                        textAlign: 'left',
                        fontFamily: 'monospace',
                        fontSize: {xs: '1rem', md: '1.25rem'},
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Stack>
    )
}

export default SuccessBox