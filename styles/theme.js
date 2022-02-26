import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#0f7487',
        },
        secondary: {
            main: '#80ADB0',
        },
        background: {
            default: '#E4E9ED',
        }
    },
    typography: {
        fontFamily: 'Work Sans',
        fontStyle: 'normal',        
        h1: {
            fontWeight: 300,
            fontSize: '2.5rem',
            lineHeight: '46.92px',
            '@media (min-width:1280px)': {
                fontSize: '3.627rem',
                lineHeight: '66.093px'
            },
            '@media (min-width:1920px)': {
                fontSize: '5.5rem',
                lineHeight: '103.22px'
            }
        },
        h2: {
            fontWeight: 300,
            fontSize: '2.4rem',
            lineHeight: '46.92px',
            '@media (min-width:1280px)': {
                fontWeight: 300,
                fontSize: '2.98rem',
                lineHeight: '55.7172px'
            },
            '@media (min-width:1920px)': {
                fontWeight: 300,
                fontSize: '4.5rem',
                lineHeight: '84px'
            }
        },
        h3: {
            fontWeight: 400,
            fontSize: '1.5rem',
            lineHeight: '28.15px',
            '@media (min-width:1280px)': {
                fontWeight: 300,
                fontSize: '2.275rem',
                lineHeight: '42.6335px'
            },
            '@media (min-width:1920px)': {
                fontWeight: 300,
                fontSize: '3.5rem',
                lineHeight: '65.59px'
            }
        },
        h4: {
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: '20px',
            '@media (min-width:1280px)': {
                fontWeight: 400,
                fontSize: '0.975rem',
                lineHeight: '18.2975px'
            },
            '@media (min-width:1920px)': {
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: '28.15px'
            }
        },
        h5: {
            fontWeight: '400',
            fontSize: '1rem',
            lineHeight: '18.77px',
            '@media (min-width:1280px)': {
                fontWeight: 300,
                fontSize: '1.3266rem',
                lineHeight: '24.9px'
            },
            '@media (min-width:1920px)': {
                fontWeight: 300,
                fontSize: '2rem',
                lineHeight: '37.54px'
            }
        },
        h6: {
            fontSize: '1.25rem',
            lineHeight: '24px',
            '@media (min-width:1280px)': {
                fontWeight: 300,
                fontSize: '1.65825rem',
                lineHeight: '30.79px'
            },
            '@media (min-width:1920px)': {
                fontWeight: 300,
                fontSize: '2.5rem',
                lineHeight: '46.42px'
            }
        },
        subtitle1: {
            fontWeight: 400,
            fontSize: '2.5rem',
            lineHeight: '46.92px',
            '@media (min-width:1280px)': {
                fontWeight: 300,
                fontSize: '2.98rem',
                lineHeight: '55.7172px'
            },
            '@media (min-width:1920px)': {
                fontWeight: 300,
                fontSize: '4.5rem',
                lineHeight: '84px'
            }
        },
        body2: {
            fontSize: '1rem',
            lineHeight: '18.77px',
            '@media (min-width:1280px)': {
                fontSize: '1.3266rem',
                lineHeight: '24.9px'
            },
            '@media (min-width:1920px)': {
                fontSize: '1rem',
                lineHeight: '37.54px'
            }
        },
        subtitle2: {
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: '18.77px',
            '@media (min-width:1280px)': {
                fontWeight: 400,
                fontSize: '1.3266rem',
                lineHeight: '24.9px'
            },
            '@media (min-width:1920px)': {
                fontWeight: 400,
                fontSize: '2rem',
                lineHeight: '37.54px'
            }
        },
        caption: {
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '1.25rem',
            lineHeight: '24px',
            '@media (min-width:1280px)': {
                fontWeight: 300,
                fontSize: '2.5rem',
                lineHeight: '46.92px'
            }
        }
    }
})

export default theme