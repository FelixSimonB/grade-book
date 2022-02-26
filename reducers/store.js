import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import reducers from './rootReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'main-root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))

const persistor = persistStore(store)

export {persistor}
export default store