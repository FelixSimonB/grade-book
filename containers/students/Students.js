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
    DeleteForever,
    Delete
} from '@mui/icons-material'
import { fetchPost } from '/utility/helpers/payloadHelper'
import { roundUp, getFinalAverage } from '/utility/helpers/helperfunction'
import { HEADERS } from '../../utility/constants/menu'

const Students = (props) => {
    const { accountData } = props

    const router = useRouter()

    const [teacherId, setTeacherId] = useState(null)
    const [students, setStudents] = useState(null)

    useEffect(() => {
        setTeacherId(accountData?.loggedInUser?.teacher_id)
    }, [accountData])

    useEffect(async () => {
        if(teacherId !== null) {
            try{
                const result = await fetchPost('/api/getStudents', { teacherId: teacherId })
                if (result.status === 200) {
                    const data = await result?.json()
                    setStudents(data)
                }
            } catch(Exception) {
                alert(Exception)
            }
        }
    }, [teacherId])

    const handleClick = async (event) => {
        event.preventDefault()
        try{
            const result = await fetchPost('/api/deleteAllStudents', { teacherId: teacherId })
            if (result.status === 200) {
                const data = await result?.json()
                setStudents(null)
            }
        } catch(Exception) {
            alert(Exception)
        }
    }

    return (
        <div>
            <Head>
                <title> GradeBook - Your Students </title>
                <meta name="description" content="Code Challenge by Edukasyon PH" />
            </Head>

            <Container component="main" maxWidth={'xl'} sx={{ mt: 15 }}>
                <Stack spacing={4}>
                    <Grid container
                        direction="row" 
                        alignItems="center" justify="flex-end">
                        <Grid item xs={8}>
                            <Typography variant={'header'} component={'h1'}> My Students </Typography>
                        </Grid>
                        <Grid item xs={4} align='right'>
                            <Button variant="contained" color="error" onClick={handleClick} startIcon={<DeleteForever />}>Delete all my Students</Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ '& th:nth-of-type(n + 3)': { textAlign: 'center' } }}>
                                <TableRow >
                                    {
                                        HEADERS.students.map((header) => (
                                            <TableCell key={header?.title}>{ header?.title }</TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                students !== null &&
                                    students?.map((student) => (
                                        <TableRow
                                        key={student?.student_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td:nth-of-type(n + 5)': { textAlign: 'center' } }}
                                        >
                                            <TableCell scope="row">
                                                {student?.lastname}
                                            </TableCell>
                                            <TableCell>{student?.firstname}</TableCell>
                                            <TableCell>{ roundUp(student?.q1) }%</TableCell>
                                            <TableCell>{ roundUp(student?.q2) }%</TableCell>
                                            <TableCell>{ roundUp(student?.q3) }%</TableCell>
                                            <TableCell>{ roundUp(student?.q4) }%</TableCell>
                                            <TableCell>{ getFinalAverage([student?.q1,student?.q2,student?.q3,student?.q4]) }%</TableCell>
                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    justifyContent="center"
                                                    divider={<Divider orientation="vertical" flexItem />}>
                                                    <Button variant="contained" color="primary"> <RemoveRedEye /> </Button>
                                                    <Button variant="contained" color="error"> <Delete /> </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
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

export default connect(mapStateToProps) (Students)