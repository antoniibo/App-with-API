import React, { useState } from 'react';
import { View, FlatList, Button, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getStaffFromApi } from '../services/staffService';
import { useFocusEffect } from '@react-navigation/native';

export default function StaffListScreen ({ navigation }) {
  const[staff, setStaff] = useState([])
  const[isLoading, setIsLoading] = useState(true)

  useFocusEffect(React.useCallback(()=>{
    getStaffFromApi()
      .then((data) =>{
        console.log('Staff Data:', data);
        setStaff(data)
      })
      .catch((error)=> {console.error(error)})
      .finally(()=> setIsLoading(false))
  }, []))
  const navigateToStaffEdit = (staffId) => {
    navigation.navigate('StaffEdit', { id: staffId });
  };
  const renderItem = ({ item }) => {
    const staff = item;

    return (
    <View key={`staffItem_${staff.id}`} style={styles.staffItem}>
      <Image source={{ uri: staff.imageUrl }} style={styles.staffImage} />
      <Button title={item.fullName} onPress={() => navigateToStaffEdit(item.id)} />
    </View>
  );
}

  return (
    <View contentContainerStyle={styles.container}>
         {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={staff}
          keyExtractor={(staff) => staff.id.toString()}
          renderItem={renderItem}
        />
        )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  staffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    border: '1px solid #ddd', 
    padding: 10,
    borderRadius: 8,
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', 
  },
  staffImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   staffItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   staffImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 25,
//     marginRight: 10,
//   },
// });

