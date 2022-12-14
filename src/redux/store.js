import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import signUpReducer from './slices/signUpSlice'
import signInReducer from './slices/signInSlice'
import tokensReducer from './slices/tokensSlice'
import projectsReducer from './slices/projectsSlice'
import tasksReducer from './slices/tasksSlice'
import usersReducer from './slices/usersSlice'
import userReducer from './slices/userSlice'

const reducers = combineReducers({
  signUp: signUpReducer,
  signIn: signInReducer,
  tokens: tokensReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  users: usersReducer,
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tokens'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
})

export const persistor = persistStore(store)
