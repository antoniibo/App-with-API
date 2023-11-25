import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './screens/MainMenu';
import StaffListScreen from './screens/StaffListing';
import AddStaffProfile from './screens/AddStaffProfile';
import StaffEdit from './screens/StaffEdit'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="StaffListing" component={StaffListScreen} />
        <Stack.Screen name="AddStaffProfile" component={AddStaffProfile} />
        <Stack.Screen name="StaffEdit" component={StaffEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

