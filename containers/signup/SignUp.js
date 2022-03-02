import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { 
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Link,
    Paper,
    Stack,
    CircularProgress,
    Grid
 } from '@mui/material'
 import { signUp } from '../../reducers/account/accountActions'

const SignUp = (props) => {
    const { accountData, signUp } = props
    const router = useRouter()
    const [accountInformation, setAccountInformation] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        let details = {
            firstname: firstname?.value,
            lastname: lastname?.value,
            email: email?.value,
            password: password?.value
        }
        signUp(details, router)
    }

    return (
        <div>
            <Head>
                <title> GradeBook - Create Account </title>
                <meta name="description" content="Code Challenge by Edukasyon PH" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container component="main" maxWidth="sm" sx={{ mt: 20}}>
                <Paper elevation={1} sx={{ py: 10, px: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h1">
                            Sign Up
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstname"
                                        label="First Name"
                                        name="firstname"
                                        autoComplete="firstname"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Last Name"
                                        name="lastname"
                                        autoComplete="lastname"
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={ accountData?.signInIsLoading }
                            >
                                { accountData?.signInIsLoading ? <CircularProgress size={24} /> : 'Sign Up' }
                            </Button>
                            <Stack direction="column" spacing={2}>
                                <Link href="/login" variant="body3">
                                    {"Already have an account? Login"}
                                </Link>
                            </Stack>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        accountData: state.accountReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (details, router) => dispatch(signUp(details, router))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignUp)