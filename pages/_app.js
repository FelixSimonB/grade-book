import React from 'react'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { 
    ThemeProvider,
    CssBaseline,
    Toolbar,
    Fab
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import createEmotionCache from '../utility/createEmotionCache' 
import { ScrollTop } from '../utility/helpers/helperfunction' 

import theme from '/styles/theme'
import Navbar from '../components/navbar/Navbar'

const clientSideEmotionCache = createEmotionCache()

const MainApp = (props) => {
    const { Component, pageProps, emotionCache = clientSideEmotionCache } = props

    React.useEffect(() => {
            const jssStyles = document.querySelector('#jss-server-side')
            if (jssStyles) {
                    jssStyles.parentElement.removeChild(jssStyles)
            }
    }, [])

    return ( 
        <>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={ theme }>                                
                    <CssBaseline />
                    <Navbar {...pageProps}/>
                    <Toolbar id="back-to-top-anchor" sx={{
                        visibility: 'hidden',
                        position: 'absolute',
                        left: '-9999px'
                    }} />
                    <div style={{ marginTop: '80px' }}>
                        <Component {...pageProps} />
                    </div>
                    <ScrollTop {...pageProps}>
                        <Fab color="secondary" size="large" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}

export default MainApp