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
      <Stack.Screen name="MainMenu" component={MainMenu}
          options={{ title: "Main Menu" }} />
        <Stack.Screen name="StaffListing" component={StaffListScreen}
          options={{ title: "Staff Listing" }} />
        <Stack.Screen name="AddStaffProfile" component={AddStaffProfile}
          options={{ title: "Add Staff Profile" }} />
        <Stack.Screen name="StaffEdit" component={StaffEdit}
          options={{ title: "Edit Staff Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

