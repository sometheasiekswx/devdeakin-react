import Stack from '@mui/material/Stack'
import notfound from '../images/404.jpg'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'


const NotfoundPage = () => {
    return (
        <Stack spacing={0} direction='column'
               justifyContent='center'
               alignItems='center'>
            <Card>
                <div style={{position: 'relative'}}>
                    <CardMedia
                        component='img'
                        sx={{
                            marginY: {lg: 0},
                            borderRadius: {xs: 0, lg: 1},
                        }}
                        src={notfound}/>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '25%',
                    }}>
                        <Typography
                            variant='h2'
                            component='a'
                            href='/'
                            sx={{
                                py: 2,
                                px: 4,
                                backgroundColor: 'primary.main',
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                fontSize: {xs: '1rem', sm: '2rem', md: '3rem'},
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Return home
                        </Typography>
                    </div>
                </div>
            </Card>
        </Stack>
    )
}

export default NotfoundPage