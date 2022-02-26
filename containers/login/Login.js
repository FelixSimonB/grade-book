import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { 
    Container,
    Typography,
    Box,
    Button,
    Avatar,
    TextField,
    Link,
    Paper,
    Stack,
    CircularProgress
 } from '@mui/material'
import { signIn } from '../../reducers/account/accountActions'

const Login = (props) => {
    const { accountData, signIn } = props
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        let credentials = {
            email: email?.value,
            password: password?.value
        }
        signIn(credentials, router)
    }

    return (
        <div>
            <Head>
                <title> GradeBook - Login </title>
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
                        <Avatar size='lg' sx={{
                            mb: 2,
                            bgcolor: 'secondary.main',
                            width: 84,
                            height: 84 }}/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                { accountData?.signInIsLoading ? <CircularProgress size={24} /> : 'Sign In' }
                            </Button>
                            <Stack direction="column" spacing={2}>
                                <Link href="/signup" variant="body3">
                                    {"Don't have an account? Sign Up"}
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
        signIn: (credentials, router) => dispatch(signIn(credentials, router))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login)