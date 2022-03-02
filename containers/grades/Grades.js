import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { 
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Button,
    Typography,
    Divider,
    Grid
} from '@mui/material'
import { 
    RemoveRedEye,
    Add,
    Delete
} from '@mui/icons-material'
import { fetchPost } from '/utility/helpers/payloadHelper'
import { getQuarterAverage, implode, seperateGradesByQuarter } from '/utility/helpers/helperfunction'
import { HEADERS } from '../../utility/constants/menu'

const Grades = (props) => {
    const { accountData } = props

    const router = useRouter()
    const [teacherId, setTeacherId] = useState(null)
    const [grades, setGrades] = useState(null)
    const [quarterGrades, setQuarterGrades] = useState(null)
    const [text, setText] = useState(null)
    const [insertGrades, setInsertGrades] = useState(null)

    useEffect(() => {
        setTeacherId(accountData?.loggedInUser?.teacher_id)
    }, [accountData])

    useEffect(async () => {
        if(teacherId !== null) {
            const result = await fetchPost('/api/getGrades', { teacherId: teacherId })
            if (result.status === 200) {
                const data = await result?.json()
                setGrades(data)
            }
        }
    }, [teacherId])

    useEffect(() => {
        setQuarterGrades(seperateGradesByQuarter(grades))
    }, [grades])

    const handleClick = async (event) => {
        event.preventDefault()
        router.push('/grades/add-grades')
    }

    return (
        <div>
            <Head>
                <title> GradeBook - Grades </title>
                <meta name="description" content="Code Challenge by Edukasyon PH" />
            </Head>

            <Container component="main" maxWidth="xl" sx={{ mt: 15 }}>
                <Stack spacing={4}>
                    <Grid container
                        direction="row" 
                        alignItems="center" justify="flex-end">
                        <Grid item xs={8}>
                            <Typography variant={'header'} component={'h1'}> My Grades </Typography>
                        </Grid>
                        <Grid item xs={4} align='right'>
                            <Button variant="contained" color="success" onClick={handleClick} startIcon={<Add />}>Add Students/Grades</Button>
                        </Grid>
                    </Grid>
                    {
                        quarterGrades &&
                        quarterGrades?.map((quarter, index) => 
                            <TableContainer key={index} component={Paper}>
                                <Typography variant={'h4'} sx={{ m: 2 }} align='center'> Quarter {index + 1} </Typography>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ '& th:nth-of-type(n + 5)': { textAlign: 'center' } }}>
                                        <TableRow >
                                            {
                                                HEADERS.grades.map((header) => (
                                                    <TableCell key={header?.title}>{ header?.title }</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        quarter &&
                                            quarter?.map((grade, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0, }, '& td:nth-of-type(n + 5)': { textAlign: 'center' } }}>
                                                    <TableCell scope="row">
                                                        {grade?.lastname}
                                                    </TableCell>
                                                    <TableCell >{grade?.firstname}</TableCell>
                                                    <TableCell>{ implode(grade?.homework_grade) }</TableCell>
                                                    <TableCell>{ implode(grade?.test_grade) }</TableCell>
                                                    <TableCell>{ getQuarterAverage(grade?.homework_grade, grade?.test_grade) }%</TableCell>
                                                    <TableCell>
                                                        <Stack
                                                            direction="row"
                                                            spacing={1}
                                                            justifyContent="center"
                                                            divider={<Divider orientation="vertical" flexItem />}>
                                                            <Button variant="contained" color="error"> <Delete /> </Button>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    }
                </Stack>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        accountData: state.accountReducer
    }
}

export default connect(mapStateToProps) (Grades)