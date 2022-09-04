import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { dispatch }) => {
    try {
      const answer = await axiosInstance.get('/projects')
      dispatch(setProjects(answer.data))
    } catch (error) {
      console.log('error projects/fetchProjects')
      console.log(error.response)
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/createProjects',
  async ({ title, description }, { dispatch }) => {
    try {
      const answer = await axiosInstance.post('/projects', {
        title,
        description,
      })
      dispatch(fetchProjects())
      console.log(answer.data)
    } catch (error) {
      console.log('error projects/createProjects')
      console.log(error.response)
    }
  }
)

const initialState = {
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload
    },
  },
})

export const { setProjects } = projectsSlice.actions

export default projectsSlice.reducer