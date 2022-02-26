import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILED, LOGOUT } from "./accountTypes"
import { fetchPost } from '/utility/helpers/payloadHelper'

export const signIn = (credentials, router) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: SIGN_IN_REQUEST
        })
        const result = await fetchPost('/api/login', credentials)
    
        if (result.status === 200) {
            const data = await result?.json()
            await dispatch({
                type: SIGN_IN_SUCCESS,
                payload: data
            })
            router.replace('/')
        } else if (result.status === 401) {
            await dispatch({
                type: SIGN_IN_FAILED
            })
        }
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        await dispatch({
            type: SIGN_IN_REQUEST
        })
        await dispatch({
            type: LOGOUT            
        })
    }
}