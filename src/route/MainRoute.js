import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProjectsScreen from '../screens/ProjectsScreen'
import ProjectInfoScreen from '../screens/ProjectInfoScreen'
import CurrentUserScreen from '../screens/CurrentUserScreen'
import { Ionicons } from '@expo/vector-icons'

const ProjectsStack = createNativeStackNavigator()
const ProjectsStackScreen = () => {
  return (
    <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProjectsStack.Screen name='Projects' component={ProjectsScreen} />
      <ProjectsStack.Screen name='ProjectInfo' component={ProjectInfoScreen} />
    </ProjectsStack.Navigator>
  )
}

const UserStack = createNativeStackNavigator()
const UserStackScreen = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name='User' component={CurrentUserScreen} />
    </UserStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const MainRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName
          if (route.name === 'ProjectsScreen') {
            iconName = focused ? 'file-tray-full' : 'file-tray-full-outline'
          } else if (route.name === 'UserScreen') {
            iconName = focused ? 'person' : 'person-outline'
          }
          return <Ionicons name={iconName} size={25} color={color} />
        },
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='ProjectsScreen' component={ProjectsStackScreen} />
      <Tab.Screen name='UserScreen' component={UserStackScreen} />
    </Tab.Navigator>
  )
}

export default MainRoute