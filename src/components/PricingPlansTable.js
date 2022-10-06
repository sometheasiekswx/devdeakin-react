import { useNavigate } from "react-router-dom";

import { postStripeCheckout } from "../api";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { AttachMoney, Close, Done } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { useFirebaseAuth } from "../firebase";
import { useStripe } from "@stripe/react-stripe-js";


const freeBenefits = [
    'Post & view questions',
    'Post & view articles',
    'Delete & edit questions',
    'Delete & edit articles',
]

const premuimBenefits = [
    'Access to chat rooms',
    'Private message anyone',
    'Future customization features like messages and banners, themes, content controls',
    'Additional admin and support features like analytics dashboard'
]


const PricingPlansPage = () => {
    const navigate = useNavigate()
    const user = useFirebaseAuth()
    const stripe = useStripe()

    const item = {
        price: 'price_1LpuBaCKKbs7bUgZJSknHTpL',
        quantity: 1,
    }
    const checkoutOptions = {
        lineItems: [item],
        mode: 'subscription',
        successUrl: `${window.location.origin}/plans/premium/success`,
        cancelUrl: `${window.location.origin}/plans/premium/cancel`,
        customerEmail: user?.email
    }

    const redirectToCheckout = async () => {
        const {error} = await stripe.redirectToCheckout(checkoutOptions)
        console.log(error)
    }

    return (
        <Grid
            container
            gap={{xs: 0, md: 2, lg: 4}}
            sx={{
                backgroundColor: 'primary.main',
                width: {xs: '100%'},
                display: 'flex', justifyContent: 'center',
                p: {xs: 0, sm: 2, lg: 4}
            }}>
            <Grid item xs={6} md={5} lg={4} container
                  sx={{
                      backgroundColor: 'white',
                      '&:hover': {
                          backgroundColor: grey[100],
                      },
                      display: 'flex', justifyContent: 'center'
                  }}
            >
                <Grid item xs={12} lg={10}
                      sx={{textAlign: 'center',}}
                >

                    <Box sx={{py: 2}}>
                        <Typography
                            variant='h4'
                            component={'h4'}
                            href='/'
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            Free
                        </Typography>

                        <Typography
                            variant='h2'
                            component={'h2'}
                            href='/'
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            <AttachMoney fontSize={'large'} sx={{mr: -6}}/> 0
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'monospace',
                        }}
                        >
                            AUD per month
                        </Typography>
                    </Box>
                    <Box sx={{py: 2, pl: {xs: 2,}}}>
                        {freeBenefits.map((freeBenefit, i) => (
                            <Typography
                                key={`${i}-${freeBenefit}`}
                                component={'div'}
                                sx={{
                                    pb: 1,
                                    display: 'flex',
                                    justifyContent: 'start',
                                    textAlign: 'left',
                                    alignItems: 'center',
                                    fontSize: {xs: '0.7rem', lg: '0.8rem'},
                                }}
                            >
                                <Done color={'success'} sx={{mr: 1}}/> {freeBenefit}
                            </Typography>
                        ))}
                        {premuimBenefits.map((premuimBenefit, i) => (
                            <Typography
                                key={`${i}-${premuimBenefit}`}
                                component={'div'}
                                sx={{
                                    pb: 1,
                                    display: 'flex',
                                    justifyContent: 'start',
                                    textAlign: 'left',
                                    alignItems: 'center',
                                    fontSize: {xs: '0.7rem', lg: '0.8rem'},
                                }}
                            >
                                <Close color={'error'} sx={{mr: 1}}/> {premuimBenefit}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{py: 2}}>
                        <Button variant={'contained'} disabled>Currently on</Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={6} md={5} lg={4} container
                  sx={{
                      backgroundColor: 'white',
                      '&:hover': {
                          backgroundColor: grey[100],
                      },
                      display: 'flex', justifyContent: 'center'
                  }}
            >
                <Grid item xs={12} lg={10}
                      sx={{textAlign: 'center',}}
                >
                    <Box sx={{py: 2}}>
                        <Typography
                            variant='h4'
                            component={'h4'}
                            href='/'
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            Premium
                        </Typography>
                        <Typography
                            variant='h2'
                            component={'h2'}
                            href='/'
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            <span style={{fontSize:'1.25rem'}}>$̶1̶.̶9̶9̶</span><AttachMoney fontSize={'large'} sx={{mr: -6}}/> <span>0.99</span>
                        </Typography>
                        <Typography sx={{
                            fontFamily: 'monospace',
                        }}
                        >
                            AUD per month
                        </Typography>
                    </Box>
                    <Box sx={{py: 2, pl: {xs: 2,}}}>
                        {freeBenefits.map((freeBenefit, i) => (
                            <Typography
                                key={`${i}-${freeBenefit}`}
                                component={'div'}
                                sx={{
                                    pb: 1,
                                    display: 'flex',
                                    justifyContent: 'start',
                                    textAlign: 'left',
                                    alignItems: 'center',
                                    fontSize: {xs: '0.7rem', lg: '0.8rem'},
                                }}
                            >
                                <Done color={'success'} sx={{mr: 1}}/> {freeBenefit}
                            </Typography>
                        ))}
                        {premuimBenefits.map((premuimBenefit, i) => (
                            <Typography
                                key={`${i}-${premuimBenefit}`}
                                component={'div'}
                                sx={{
                                    pb: 1,
                                    display: 'flex',
                                    justifyContent: 'start',
                                    textAlign: 'left',
                                    alignItems: 'center',
                                    fontSize: {xs: '0.7rem', lg: '0.8rem'},
                                }}
                            >
                                <Done color={'success'} sx={{mr: 1}}/> {premuimBenefit}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{py: 2}}>
                        <Button variant={'contained'} color={'primary'} onClick={redirectToCheckout}>Get started</Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PricingPlansPage