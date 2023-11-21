import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MainMenu ({ navigation }){
  return (
    <View style={styles.container}>
      <Button
        title="Staff List"
        onPress={() => navigation.navigate('StaffListing')}
      />
      <Button
        title="Add Staff Profile"
        onPress={() => navigation.navigate('AddStaffProfile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
});

