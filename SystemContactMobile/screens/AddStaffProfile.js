import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import {postStaffToApi,getDepartmentsFromApi} from '../services/staffService';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

export default function AddStaffProfileScreen({navigation}) {
  
  const [fullName, setFullName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [departmentId, setDepartmentId] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseLot, setHouseLot] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');


  const saveStaffProfile = () => {
    postStaffToApi(fullName, imageUrl,departmentId, phoneNumber, houseLot, street, suburb, postcode,state)
    .then(()=>{
      navigation.navigate('MainMenu');
    })
    .catch((error)=>{
      console.error(error)
    })
  };

  useFocusEffect(
    React.useCallback(() => {
        getDepartmentsFromApi()
            .then((data => setDepartments(data)))
            .catch((error) => console.error(error));
    }, [])
);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
      />
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.photo} />
        ) : null}
      </View>
      <Text style={styles.label}>Department:</Text>
      <Picker
        selectedValue={departmentId}
        onValueChange={(itemValue, itemIndex) =>
          setDepartmentId(parseInt(itemValue,10))
        }
      >
        <Picker.Item label="Please select..." value="0" />
        {departments.map((d) =>
          <Picker.Item key={d.id} label={d.name} value={d.id} />
        )}
      </Picker>

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput style={styles.input} value={houseLot} onChangeText={(text) => setHouseLot(text)} placeholder="House/Lot" />
      <TextInput style={styles.input} value={street} onChangeText={(text) => setStreet(text)} placeholder="Street" />
      <TextInput style={styles.input} value={suburb} onChangeText={(text) => setSuburb(text)} placeholder="Suburb" />
      <TextInput
        style={styles.input}
        value={postcode}
        onChangeText={(text) => setPostcode(text)}
        placeholder="Postcode"
        keyboardType="numeric"
      />
      {/* <TextInput
        style={styles.input}
        value={state}
        onChangeText={(text) => setState(text)}
        placeholder="State"
      /> */}
      <Picker
        selectedValue={state}
        onValueChange={(itemValue, itemIndex) => setState(itemValue)}
      >
        <Picker.Item label="Please select..." value="" />
        <Picker.Item label="NSW" value="NSW" />
        <Picker.Item label="VIC" value="VIC" />
        <Picker.Item label="QLD" value="QLD" />
        <Picker.Item label="SA" value="SA" />
        <Picker.Item label="WA" value="WA" />
        <Picker.Item label="TAS" value="TAS" />
        <Picker.Item label="ACT" value="ACT" />
        <Picker.Item label="NT" value="NT" />
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveStaffProfile} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  imageUrl: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

