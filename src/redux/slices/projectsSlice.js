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

export const createNewProject = createAsyncThunk(
  'projects/createProject',
  async ({ title, description, callback }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      await axiosInstance.post('/projects', {
        title,
        description,
      })
      dispatch(fetchProjects())
      callback?.()
    } catch (error) {
      console.log('error projects/createProject')
      console.log(error.response.data)
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const editProject = createAsyncThunk(
  'projects/editProject',
  async ({ title, description }, { dispatch }) => {
    try {
      await axiosInstance.put(`/projects/${projectId}`, {
        title,
        description,
      })
      dispatch(fetchProjects())
    } catch (error) {
      console.log('error projects/editProject')
      console.log(error.response)
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, { dispatch }) => {
    try {
      await axiosInstance.delete(`/projects/${id}`)
      dispatch(fetchProjects())
    } catch (error) {
      console.log('error projects/deleteProject')
      console.log(error.response)
    }
  }
)

const initialState = {
  projects: [],
  isLoading: false,
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setProjects, setLoading } = projectsSlice.actions

export default projectsSlice.reducer
