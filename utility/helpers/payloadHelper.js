import { API_URL } from '/utility/constants/variables'

export async function fetchPost(endpoint, body) {
    const response = await fetch('http://localhost:3001' + endpoint,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return response
}