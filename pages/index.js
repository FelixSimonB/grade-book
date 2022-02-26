import React from 'react'
import dynamic from 'next/dynamic'

const Homepage = dynamic(() => import('../containers/homepage/Homepage'))

const IndexPage = () => <Homepage />

export default IndexPage
