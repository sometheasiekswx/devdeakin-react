import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'


const data = [
    {
        title: 'Explore',
        href: '/explore',
        items: [
            {title: 'Home', href: '/'},
            {title: 'Questions', href: '/questions'},
            {title: 'Articles', href: '/articles'},
            {title: 'Tutorials', href: '/tutorials'},
        ]
    },
    {
        title: 'Support',
        href: '/support',
        items: [
            {title: 'FQAs', href: '/faq'},
            {title: 'Help', href: '/help'},
            {title: 'Contact Us', href: '/contact-us'},
        ]
    },
]

const extraData = [
    {title: 'Privacy Policy', href: '/'},
    {title: 'Terms', href: '/'},
    {title: 'Code of Conduct', href: '/'},

]


const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: 'primary.light',
            width: {xs: '100%'},
            py: 4,
            gap: {sm: 4}
        }}>
            <Stack spacing={0} direction='column'
                   justifyContent='center'
                   alignItems='center'>
                <Grid
                    container
                    sx={{pb: 4, width: {xs: '100%'}}}
                    direction='row'
                    justifyContent='space-between'
                    alignItems='flex-start'
                    rowSpacing={{xs: 4}}
                    columnSpacing={{xs: 2, md: 0}}
                >
                    {data.map(
                        (d, index) => (
                            <Grid item xs={4}
                                  key={`${d.title}-${index}`}
                                  sx={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                  }}
                            >
                                <Stack spacing={1} alignItems='flex-start'>
                                    <Typography
                                        variant='h6'
                                        component={'a'}
                                        href={d.href}
                                        sx={{
                                            mb: 1,
                                            textAlign: 'center',
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            fontSize: {xs: '0.8em', sm: '1rem', md: '1.25rem'},
                                            color: 'white',
                                            letterSpacing: '.1rem',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {d.title}
                                    </Typography>
                                    {d.items ? d.items.map((item, index) => (
                                        <Typography
                                            key={`${item.title}-${index}`}
                                            variant='a'
                                            component={'a'}
                                            href={item.href}
                                            sx={{
                                                textAlign: 'center',
                                                fontFamily: 'monospace',
                                                fontWeight: 500,
                                                fontSize: {xs: '0.7em', sm: '1rem'},
                                                color: 'white',
                                                letterSpacing: '.1rem',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    )) : <></>}

                                </Stack>
                            </Grid>
                        )
                    )}
                    <Grid item xs={4}
                          sx={{
                              display: 'flex',
                              justifyContent: 'center',
                          }}
                    >
                        <Stack spacing={1}>
                            <Typography
                                variant='h6'
                                component={'a'}
                                href='/'
                                sx={{
                                    mb: 1,
                                    textAlign: 'center',
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    fontSize: {xs: '0.8em', sm: '1rem', md: '1.25rem'},
                                    color: 'info.main',
                                    letterSpacing: '.1rem',
                                    textDecoration: 'none',
                                }}
                            >
                                Stay connected
                            </Typography>
                            <Stack direction='row' spacing={2}>
                                <FacebookIcon color={'info'}/>
                                <TwitterIcon color={'info'}/>
                                <InstagramIcon color={'info'}/>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                <Typography
                    variant='h6'
                    component={'h6'}
                    href='/'
                    sx={{
                        mb: 2,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'white',
                        fontSize: {xs: '0.80rem', sm: '1rem', md: '1.25rem'},
                        letterSpacing: '.1rem',
                        textDecoration: 'none',
                    }}
                >
                    DEV@Deakin 2022 by Somethea Siek
                </Typography>
                <Grid
                    container
                    sx={{width: {xs: '100%'}}}
                    spacing={2}
                    columnSpacing={{xs: 2, md: 0}}
                >
                    {extraData.map((d, index) => {
                        let justifyContent = 'flex-end'
                        if (index === 1) {
                            justifyContent = 'center'
                        } else if (index === 2) {
                            justifyContent = 'flex-start'
                        }
                        return (
                            <Grid item xs={4} key={`${d.title}-${index}`} sx={{
                                display: 'flex',
                                justifyContent: {justifyContent},
                            }}>
                                <Typography
                                    variant='a'
                                    component={'a'}
                                    href={d.href}
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 500,
                                        fontSize: {xs: '0.7em', sm: '1rem'},
                                        color: 'white',
                                        letterSpacing: '.1rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {d.title}
                                </Typography>
                            </Grid>
                        )
                    })}
                </Grid>
            </Stack>
        </Box>
    )
}

export default Footer