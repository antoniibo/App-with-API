import React from 'react';
import { View,ScrollView, FlatList, Button, Image, Text, StyleSheet } from 'react-native';

const staffData = [
  {id: 1, name: 'John Doe', imageUrl: 'https://cdn.britannica.com/41/218341-050-51D8903F/American-actor-John-Krasinski-2020.jpg' },
  {id: 2, name: 'Smith Smithson', imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1650_v9_bb.jpg'},
  {id: 3, name: 'Granny Apple', imageUrl:'https://static.wikia.nocookie.net/grannysmith/images/c/c7/Mrs._Smith.jpg/revision/latest?cb=20200118214621'},
  {id: 4, name: 'Big Monkey', imageUrl:'https://bigthink.com/wp-content/uploads/2014/08/origin-214.jpg?w=640'},
];

export default function StaffListScreen ({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.staffItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.staffImage} />
      <Button
        title={item.name}
        onPress={() => navigation.navigate('StaffDetails', { staffId: item.id })}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={staffData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
    </ScrollView>
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
  },
  staffImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
});

