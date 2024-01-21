import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import userSlice from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

// persist is used for store the use data in local storage, even through refresh the web browser,this why we use persist

const rootreducer = combineReducers({
    user:userSlice,
})

const persistconfig = {
    key:'root',
    storage,
    version:1
}


const persistedreducers = persistReducer(persistconfig,rootreducer) 


export const store = configureStore({
  reducer: persistedreducers,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})


export const persistor = persistStore(store)


