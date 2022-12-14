import { Box, Button, FlatList, HStack, Text } from 'native-base'
import { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsersNotInProject } from '../redux/selectors/selectors'
import { fetchUsers } from '../redux/slices/usersSlice'
import { addUserToProject } from '../redux/slices/projectsSlice'
import { useFeedback } from '../hooks/useFeedback'

const RenderUserItem = memo(({ user }) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const { showFeedback } = useFeedback()

  const errorCallback = (message) => {
    setLoading(false)
    showFeedback(message)
  }

  const addUser = () => {
    setLoading(true)
    dispatch(addUserToProject({ userId: user.id, errorCallback }))
  }

  return (
    <Box width='80%' borderBottomWidth={1} py='2'>
      <HStack justifyContent='space-between' alignItems='center'>
        <Text>{user.username}</Text>
        <Button onPress={addUser} isLoading={isLoading}>
          Add
        </Button>
      </HStack>
    </Box>
  )
})

const UsersList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <RenderUserItem user={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={1}
    />
  )
}

const AddUserScreen = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsersNotInProject)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <Box flex={1} safeArea>
      <UsersList data={users} />
    </Box>
  )
}

export default AddUserScreen
