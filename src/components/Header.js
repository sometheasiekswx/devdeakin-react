import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signOut } from 'firebase/auth'
import { firebaseAuth, useFirebaseAuth } from '../firebase'

import ErrorBox from './ErrorBox'
import SuccessBox from './SuccessBox'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { Login, Logout, MessageOutlined, PersonAdd, PostAdd } from '@mui/icons-material'


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    flexGrow: 1,
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit', '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0), // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}))


const Header = () => {
    const user = useFirebaseAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleCloseNavMenu = (href) => {
        setAnchorElNav(null)
        navigate(href)
    }

    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Typography
                            variant='h6'
                            component='a'
                            href='/'
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            DEV@Deakin
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleOpenNavMenu}
                                color='inherit'
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom', horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top', horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'flex', md: 'none'},
                                }}
                            >
                                {(user !== null && user !== undefined) &&
                                    <MenuItem onClick={() => handleCloseNavMenu('/chat')} sx={{m: 1}}>
                                        <img src={user.photoURL}
                                             style={{height: 36, marginRight: 14}}
                                             loading={'lazy'}
                                        />
                                        <Typography textAlign='center'>{user.displayName}</Typography>
                                    </MenuItem>
                                }
                                {(user !== null && user !== undefined) &&
                                    <Divider/>
                                }
                                {(user !== null && user !== undefined) &&
                                    <MenuItem onClick={() => handleCloseNavMenu('/chat')} sx={{m: 1}}>
                                        <MessageOutlined fontSize={'large'} sx={{mr: 2}}/>
                                        <Typography textAlign='center'>Chat</Typography>
                                    </MenuItem>
                                }
                                <MenuItem onClick={() => handleCloseNavMenu('/post')} sx={{m: 1}}>
                                    <PostAdd fontSize={'large'} sx={{mr: 2}}/>
                                    <Typography textAlign='center'>Post</Typography>
                                </MenuItem>


                                {(user === null || user === undefined) &&
                                    <MenuItem onClick={() => handleCloseNavMenu('/login')} sx={{m: 1}}>
                                        <Login fontSize={'large'} sx={{mr: 2}}/>
                                        <Typography textAlign='center'>Login</Typography>
                                    </MenuItem>
                                }
                                {(user === null || user === undefined) &&
                                    <MenuItem onClick={() => handleCloseNavMenu('/signup')} sx={{m: 1}}>
                                        <PersonAdd fontSize={'large'} sx={{mr: 2}}/>
                                        <Typography textAlign='center'>Sign up</Typography>
                                    </MenuItem>
                                }
                                {(user !== null && user !== undefined) &&
                                    <MenuItem
                                        onClick={() => signOut(firebaseAuth).then(() => {
                                            // setUser({})
                                            setSuccess('Successfully logged out')
                                            setTimeout(() => {
                                                setSuccess('')
                                            }, 500)
                                        }).catch((error) => {
                                            setError(error.toString())
                                        })}
                                        sx={{m: 1}}
                                    >
                                        <Logout fontSize={'large'} sx={{mr: 2}}/>
                                        <Typography textAlign='center'>Logout</Typography>
                                    </MenuItem>
                                }
                            </Menu>
                        </Box>
                        <Search sx={{mx: 2}}>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder='Search everything'
                                inputProps={{'aria-label': 'search'}}
                            />
                        </Search>
                        <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                            {(user !== null && user !== undefined) && <>
                                <Link to={'/chat'}
                                      style={{
                                          marginLeft: 2,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          display: 'flex'
                                      }}>
                                    <img src={user.photoURL}
                                         style={{height: 36}}
                                         loading={'lazy'}
                                    />
                                </Link>

                                <Button
                                    onClick={() => navigate('/chat')}
                                    sx={{mr: 2, color: 'white', display: 'block', whiteSpace: 'nowrap'}}
                                >
                                    {user.displayName}
                                </Button>
                            </>}
                        </Box>
                        {(user !== null && user !== undefined) &&
                            <Divider orientation='vertical' flexItem
                                     sx={{backgroundColor: 'white', display: {xs: 'none', md: 'flex'}}}/>
                        }
                        <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                            {(user !== null && user !== undefined) &&
                                <Button
                                    onClick={() => navigate('/chat')}
                                    sx={{ml: 2, color: 'white', whiteSpace: 'nowrap'}}
                                    variant={'contained'}
                                    startIcon={<MessageOutlined/>}
                                >
                                    Chat
                                </Button>
                            }
                            <Button
                                onClick={() => navigate('/post')}
                                sx={{ml: 2, color: 'white',}}
                                variant={'contained'}
                                startIcon={<PostAdd/>}
                            >
                                Post
                            </Button>
                            {(user === null || user === undefined) &&
                                <>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        sx={{ml: 2, color: 'white',}}
                                        variant={'contained'}
                                        startIcon={<Login/>}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/signup')}
                                        sx={{ml: 2, color: 'white', whiteSpace: 'nowrap'}}
                                        variant={'contained'}
                                        color={'secondary'}
                                        startIcon={<PersonAdd/>}
                                    >
                                        Sign up
                                    </Button>
                                </>
                            }
                            {(user !== null && user !== undefined) && <Button
                                onClick={() => signOut(firebaseAuth).then(() => {
                                    setSuccess('Successfully logged out')
                                    setTimeout(() => {
                                        setSuccess('')
                                    }, 500)
                                }).catch((error) => {
                                    setError(error.toString())
                                })}
                                variant={'contained'}
                                color={'secondary'}
                                sx={{ml: 2, color: 'white',}}
                                startIcon={<Logout/>}
                            >
                                Logout
                            </Button>}
                        </Box>
                        <Typography
                            variant='h6'
                            component='a'
                            href='/'
                            sx={{
                                mx: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                fontSize: '1rem',
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            DEV@Deakin
                        </Typography>
                    </Toolbar>

                </Container>
            </AppBar>
            <Stack>
                {error && <ErrorBox message={error} sx={{m: 0}}/>}
                {success && <SuccessBox message={success} sx={{m: 0}}/>}
            </Stack>
        </>
    )
}

export default Header