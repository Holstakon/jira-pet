import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true))
      const projectId = getState().projects.projectId
      const answer = await axiosInstance.get(`projects/${projectId}/tasks`)
      dispatch(setTasks(answer.data.tasks))
    } catch (error) {
      console.log('error taksks/fetchTasks')
      console.log(error.response)
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async ({ errorFetchTask }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true))
      const projectId = getState().projects.projectId
      const taskId = getState().tasks.taskId
      const answer = await axiosInstance.get(`projects/${projectId}/tasks/${taskId}`)
      dispatch(setTask(answer.data.task))
    } catch (error) {
      console.log('error taksks/fetchTaskById')
      errorFetchTask?.(error.response.data.error)
      dispatch(fetchTasks())
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const createNewTask = createAsyncThunk(
  'tasks/createTask',
  async (
    { title, description, userId, successCallback, errorCallback },
    { dispatch, getState }
  ) => {
    try {
      dispatch(setLoading(true))
      const projectId = getState().projects.projectId
      await axiosInstance.post(`projects/${projectId}/tasks`, {
        title,
        description,
        status_id: 1,
        type_id: 1,
        user_id: userId,
      })
      successCallback?.()
    } catch (error) {
      errorCallback?.(error.response.data.title)
      console.log('error tasks/createTask')
    } finally {
      dispatch(fetchTasks())
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ successDelete, errorDelete }, { dispatch, getState }) => {
    try {
      const projectId = getState().projects.projectId
      const taskId = getState().tasks.taskId
      await axiosInstance.delete(`projects/${projectId}/tasks/${taskId}`)
      successDelete?.()
    } catch (error) {
      errorDelete?.()
      console.log('error tasks/deleteTask')
      console.log(error.response.data)
    } finally {
      dispatch(fetchTasks())
    }
  }
)

const initialState = {
  tasks: [],
  taskId: '',
  task: {},
  isLoading: false,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    setTaskId: (state, action) => {
      state.taskId = action.payload
    },
    setTask: (state, action) => {
      state.task = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setTasks, setTaskId, setTask, setLoading } = tasksSlice.actions

export default tasksSlice.reducer
