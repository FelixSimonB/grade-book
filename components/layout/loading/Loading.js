import React from 'react'
import { useStyles } from './styles'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = ({ bgColor = 'rgba(130, 130, 130, 0.3)', iconColor = '#ffff', isFullscreen = true }) => {
    const styles = useStyles()

    return (
        <div className={ isFullscreen ? styles.rootFullscreen : styles.root } style={ { backgroundColor: bgColor } }>
            <div className={ styles.loadingIconContainer }>
                <CircularProgress style={ { color: iconColor } }/>
            </div>
        </div>
    )
}

export default Loading