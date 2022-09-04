import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

export const handleSignUp = createAsyncThunk(
  'singUp/handleSignUp',
  async ({ username, email, password }) => {
    try {
      const answer = await axiosInstance.post('/registration', {
        username,
        email,
        password,
      })
      console.log(answer.data)
    } catch (error) {
      console.log('error singUp/handleSignUp')
      console.log(error.response)
    }
  }
)

const initialState = {
  username: '',
  email: '',
  password: '',
}

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
  },
})

export const { setUsername, setEmail, setPassword } = signUpSlice.actions

export default signUpSlice.reducer