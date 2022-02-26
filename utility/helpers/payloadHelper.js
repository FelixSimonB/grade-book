import { API_URL } from '/utility/constants/variables'

export async function fetchPost(endpoint, body) {
    const response = await fetch(API_URL + endpoint,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return response
}