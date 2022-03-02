import App from 'next/app'
import React, { useState } from 'react'
import Head from 'next/head'
import store, {persistor} from '/reducers/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CacheProvider } from '@emotion/react'
import { 
    ThemeProvider,
    CssBaseline,
    Toolbar,
    Fab
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import createEmotionCache from '../utility/createEmotionCache'
import NextNProgress from 'nextjs-progressbar'
import { ScrollTop } from '../utility/helpers/helperfunction' 

import theme from '/styles/theme'
import Navbar from '../components/navbar/Navbar'
import Loading from '../components/layout/loading/Loading'

const clientSideEmotionCache = createEmotionCache()

const MainApp = (props) => {
    const { Component, appProps, emotionCache = clientSideEmotionCache } = props
    const [status, setStatusBase] = useState(null)

    React.useEffect(() => {
            const jssStyles = document.querySelector('#jss-server-side')
            if (jssStyles) {
                    jssStyles.parentElement.removeChild(jssStyles)
            }
    }, [])

    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>GradeBook</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>

                <PersistGate
                    loading={ <Loading bgColor='#ffff' iconColor = '#666666' /> }
                    persistor={ persistor }>
                    <CacheProvider value={emotionCache}>
                        <NextNProgress color={'#6ab84f'}/>
                        <CssBaseline />
                        <ThemeProvider theme={ theme }>
                            <Navbar {...appProps}/>
                            <Toolbar id="back-to-top-anchor" sx={{
                                visibility: 'hidden',
                                position: 'absolute',
                                left: '-9999px'
                            }} />
                            <div style={{ marginTop: '90px' }}>
                                <Component {...appProps}/>
                                {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
                            </div>
                            <ScrollTop {...appProps}>
                                <Fab color="secondary" size="large" aria-label="scroll back to top">
                                    <KeyboardArrowUpIcon />
                                </Fab>
                            </ScrollTop>
                        </ThemeProvider>
                    </CacheProvider>
                </PersistGate>
            </Provider>
        </>
    )
}

MainApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
}

export default MainApp