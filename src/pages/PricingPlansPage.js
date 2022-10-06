import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Parallax } from 'react-parallax'

import wallpaper
    from '../images/wallpaperflare.com_wallpaper(1) copy.jpg'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import PricingPlansTable from "../components/PricingPlansTable";
import { useFirebaseAuth } from "../firebase";
import { useStripe } from "@stripe/react-stripe-js";


const PricingPlansPage = () => {
    return (
        <Stack spacing={0} direction='column'
               justifyContent='center'
               alignItems='center'>

            <Box sx={{width: {xs: '100%'},}} alt='Altered carbon wallpaper'>
                <Parallax bgImage={wallpaper} strength={500}>
                    <Box sx={{height: 250}}>
                        <Box sx={{
                            top: {xs: '50%',},
                            left: {xs: '50%',},
                            transform: {xs: 'translate(-50%,-50%)',},
                            position: 'absolute'
                        }}>
                            <Typography
                                variant='h2'
                                component={'h2'}
                                href='/'
                                sx={{
                                    my: 0,
                                    p: 2,
                                    textAlign: 'center',
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    letterSpacing: '.1rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: 'primary.main',
                                }}
                            >
                                <TypeAnimation
                                    sequence={[
                                        'Pricing Plans',
                                        () => {
                                            console.log('Done typing!')
                                        }
                                    ]}
                                    speed={10}
                                    cursor={true}
                                />
                            </Typography>
                        </Box>
                    </Box>
                </Parallax>
            </Box>
            <PricingPlansTable/>
        </Stack>
    )
}

export default PricingPlansPage