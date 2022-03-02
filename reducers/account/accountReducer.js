import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILED, LOGOUT } from "./accountTypes"

const initialState = {
    loggedInUser: null,
    isLoggedIn: false,
    signInIsLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {
                ...state,
                signInIsLoading: true,
                isLoggedIn: false
            }
        case SIGN_IN_SUCCESS:
            return {
                loggedInUser: action.payload,
                isLoggedIn: true,
                signInIsLoading: false
            }
        case SIGN_IN_FAILED:
            return {
                loggedInUser: action.payload,
                isLoggedIn: false,
                signInIsLoading: false
            }
        case LOGOUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer