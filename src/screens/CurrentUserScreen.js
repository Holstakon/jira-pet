import { Box, Center, Text, VStack } from 'native-base'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '../redux/slices/userSlice'
import UserAvatar from '../components/UsersComponents/UserAvatar'

const CurrentUserScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [])

  const currentUser = useSelector((state) => state.user.user)
  return (
    <Center width='100%' height='100%' safeArea>
      <Box>
        <VStack alignItems='center'>
          <UserAvatar />
          <Text>{currentUser?.id}</Text>
          <Text>{currentUser?.username}</Text>
          <Text>{currentUser?.email}</Text>
          <Text>{currentUser?.role}</Text>
        </VStack>
      </Box>
    </Center>
  )
}

export default CurrentUserScreen
