import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
    rootFullscreen: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        top: 0,
        left: 0
    },
    root: {
        backgroundColor: 'rgba(130, 130, 130, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    loadingIconContainer: {
        position: 'relative',
        margin: 'auto',
        display: 'flex',
        width: '52px',
        height: '52px',
        top: 'calc(50% - (52px/2))',
        '& > * + *': {
            marginLeft: 2
        }
    }
}))