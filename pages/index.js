import Head from 'next/head'
import { Container, Typography, Box } from '@mui/material'

export default function Home() {
    return (
        <div>
            <Head>
                <title> GradeBook - Dashboard </title>
                <meta name="description" content="Code Challenge by Edukasyon PH" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography>
                    {[...new Array(100)]
                    .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                    )
                    .join('\n')}
                    </Typography>
                </Box>
            </Container>
        </div>
    )
}
