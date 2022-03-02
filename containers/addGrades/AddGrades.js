import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { 
    Container,
    Input,
    Paper,
    Stack,
    Button,
    Typography,
    Divider,
    Grid,
    TextareaAutosize
} from '@mui/material'
import { 
    ArrowBack,
    TextSnippet,
    Upload
} from '@mui/icons-material'
import { fetchPost } from '/utility/helpers/payloadHelper'
import { translateFileToObject } from '/utility/helpers/helperfunction'
import AlertMessage from '/components/alert/AlertMessage'

const AddGrades = (props) => {
    const { accountData } = props
    const router = useRouter()

    const inputTextArea = useRef(null)

    const [grades, setGrades] = useState(null)
    const [alert, setAlert] = useState(null)

    const showFile = (e) => {
        try {
            setGrades(null)
            e.preventDefault()
            const reader = new FileReader()
            reader.onload = (e) => {
                const read = e.target.result
                const translatedGrade = translateFileToObject(read, accountData?.loggedInUser?.teacher_id)
                if (translatedGrade === null) {
                    setAlert({ msg: "Invalid Format", sev: "error"})
                    throw("Invalid Format")
                } else {
                    setAlert({ msg: "Success uploading file", sev: "success"})
                    inputTextArea.current.value = read
                    setGrades(translatedGrade)
                }
            }
            reader.readAsText(e.target.files[0])
        } catch (error) {
            setAlert({ msg: error.message, sev: "error"})
        } finally {
            e.target.value = null
        }
    }

    async function addGrades() {
        if(grades !== null) {
            try{
                const result = await fetchPost('/api/addGrades', translateFileToObject(inputTextArea?.current?.value, accountData?.loggedInUser?.teacher_id))
                if (result.status === 200) {
                    const result2 = await fetchPost('/api/getGrades', { teacherId: accountData?.loggedInUser?.teacher_id })
                    if (result2.status === 200) {
                        const data = await result2?.json()
                        setAlert({ msg: "Success uploading students! Redirecting to grades view...", sev: "success"})
                    }
                }
            } catch(Exception) {
                setAlert({ msg: Exception.message, sev: "error"})
            }
        }
    }

    return (
        <>
        <Head>
            <title> Grades - Add Grades </title>
            <meta name="description" content="Code Challenge by Edukasyon PH" />
        </Head>

        <Container component="main" sx={{ mt: 15 }}>
            <Stack spacing={4}>
                <Grid container
                    direction="row" 
                    alignItems="center">
                    <Grid item xs={4} align='left'>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => router.back() }
                            sx={{ color: 'white' }}
                            startIcon={<ArrowBack />}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={8} align='right'>
                        <Typography variant={'subHeader'} component={'h1'}> {'Add Student & Grades'} </Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} sx={{ p: 4 }} spacing={ 2 }>
                    <Grid item xs={12}>
                        <Stack
                            direction="column"
                            spacing={1}>
                            <label htmlFor="contained-button-file">
                                <Input accept="text/*" id="contained-button-file" type="file" style={{ display: 'none'}} onChange={showFile}/>
                                <Button variant="contained" component="span" startIcon={<TextSnippet />} sx={{ width: '100%' }}>
                                    Upload
                                </Button>
                            </label>
                            <Typography variant={'p'} align='center'> - or - </Typography>
                            <TextareaAutosize
                                ref={inputTextArea}
                                aria-label="empty textarea"
                                placeholder="Input"
                                style={{ width: '100%', minimumHeight: '450px'}}
                                minRows={20}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} align="right">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={addGrades}
                            sx={{ color: 'white' }}
                            startIcon={<Upload />}>
                            Upload Students
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
            {alert ? <AlertMessage key={Math.random()} message={alert?.msg} severity={alert?.sev}/> : null}
        </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        accountData: state.accountReducer
    }
}

export default connect(mapStateToProps) (AddGrades)