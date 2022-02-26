import React from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Container, Typography, Grid, Stack, Button } from '@mui/material'
import { useStyles } from './styles'
import { LOGO } from '/utility/constants/menu' 

const Homepage = (props) => {
    const { accountData } = props
    const styles = useStyles()
    const router = useRouter()

    const handleClick = (event, url) => {
        router.push(url)
    }

    return (
        <div>
            <Head>
                <title> GradeBook - Dashboard </title>
                <meta name="description" content="Code Challenge by Edukasyon PH" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container maxWidth="lg" >
                <Grid container spacing={2} className={styles?.homepage}>
                    <Grid item xs={0} md={6} align="center" style={{
                        margin: 'auto',
                        width: '50%',
                        padding: '10px',
                    }}>
                        <img src={LOGO.originBg} alt="logo" style={{ width: '20rem' }}/>
                    </Grid>
                    <Grid item xs={12} md={6} style={{
                        margin: 'auto',
                        width: '50%',
                        padding: '10px',
                    }}>
                        <Typography variant={'h1'} className={styles?.header} sx={{ mb: 4 }}>
                            <font color='#6ab84f'>Grade</font>
                            <font color='#80adb0'>Book</font>
                        </Typography>
                        <Typography variant={'h4'} sx={{ mb: 4 }}>
                            Tool for instructors to calculate and store grade 
                            information and distribute it to students online.
                            Tool for instructors to calculate and store grade 
                            information and distribute it to students online.
                        </Typography>
                        {
                            !accountData?.isLoggedIn &&
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={ (event) => handleClick(event, '/login')}>Login</Button>
                                <Button variant="outlined" onClick={ (event) => handleClick(event, '/signup')}>SignUp</Button>
                            </Stack>
                        }
                    </Grid>
                     
                </Grid>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        accountData: state.accountReducer
    }
}

export default connect(mapStateToProps) (Homepage)