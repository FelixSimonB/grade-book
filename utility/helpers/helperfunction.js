import React from 'react'
import { 
    useScrollTrigger,
    Zoom,
    Box
} from '@mui/material'

export const ScrollTop = (props) => { 
    const { children } = props
    const trigger = useScrollTrigger()
    
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        )

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    )
}
