import React from 'react'

import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useTheme } from "@mui/material/styles"
import { grey } from '@mui/material/colors'
import Box from "@mui/material/Box"


const ChatMessage = (props) => {
    const theme = useTheme()

    const {
        avatar,
        messages,
        side,
        GridContainerProps,
        GridItemProps,
        AvatarProps,
        getTypographyProps,
    } = props
    return (
        <Grid
            container
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
            sx={{width: {xs: '100%'}}}
            {...GridContainerProps}
        >
            {side === 'left' && (
                <Grid item {...GridItemProps}>
                    <Avatar
                        src={avatar}
                        {...AvatarProps}
                        className={AvatarProps.className}
                        sx={{
                            ml: 2,
                            width: theme.spacing(4),
                            height: theme.spacing(4),
                        }}
                    />
                </Grid>
            )}
            <Grid item xs={(side === 'right' ? 12 : 10)} sx={{m: 2}}>
                {messages.map((msg, i) => {
                    const TypographyProps = getTypographyProps(msg, i, props)
                    return (
                        <Box
                            key={msg.id || i}
                            sx={{
                                textAlign: 'left',
                                display: 'flex',
                                justifyContent: (side === 'right' ? 'flex-end' : 'flex-start')
                            }}
                        >

                            <Typography
                                align={'left'}
                                {...TypographyProps}
                                className={TypographyProps.className}
                                gutterBottom variant='span' component='span'
                                sx={{
                                    overflowX: 'auto',
                                    backgroundColor: (side === 'right' ? 'primary.main' : grey[100]),
                                    color: (side === 'right' ? 'white' : grey[700]),
                                    padding: theme.spacing(1, 2),
                                    display: 'inline-block',
                                    wordBreak: 'break-word',
                                    mb: 1,
                                    borderRadius: theme.spacing(4),
                                    fontSize: '.9375rem'
                                }}
                            >
                                {msg}
                            </Typography>
                        </Box>
                    )
                })}
            </Grid>
        </Grid>
    )
}

ChatMessage.defaultProps = {
    avatar: '',
    messages: [],
    side: 'left',
    GridContainerProps: {},
    GridItemProps: {},
    AvatarProps: {},
    getTypographyProps: () => ({}),
}
export default ChatMessage