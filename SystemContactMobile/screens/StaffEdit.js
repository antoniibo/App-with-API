import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { getStaffById, updateStaffToApi } from '../services/staffService';
import { useFocusEffect } from '@react-navigation/native';


export default function StaffEditScreen({ route, navigation }) {
  const staffId = route.params.id;
  
  const [fullName, setFullName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseLot, setHouseLot] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');

  function setStaff(staff){
    setFullName(staff.fullName);
    setImageUrl(staff.imageUrl);
    setPhoneNumber(staff.phoneNumber);
    setHouseLot(staff.houseLot);
    setStreet(staff.street)
    setSuburb(staff.suburb)
    setPostcode(staff.postcode)
    setState(staff.state)
  }
  useFocusEffect(
    React.useCallback(() => {
        let isActive = true;

        async function fetchStaff() {
            try {
                const staff = await getStaffById(staffId);

                if (isActive) {
                    setStaff(staff);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchStaff();

        return () => {
            isActive = false;
        };

        // Old version using promises
        // getMusicByIdFromApi(musicId)
        //     .then((data) => {
        //         setMusic(data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }, [staffId])
);

  const saveStaffProfile = () => {

    const  staff = {
        id: staffId,
        fullName,
        imageUrl,
        phoneNumber,
        houseLot,
        street,
        suburb,
        postcode,
        state
    }

    updateStaffToApi(staff)
      .then(() => {
        navigation.navigate('StaffListing');
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      <TextInput
        style={styles.input}
        value={state}
        onChangeText={(text) => setState(text)}
        placeholder="State"
      />

      <View style={styles.buttonContainer}>
        <Button title="Update Info" onPress={saveStaffProfile} />
      </View>
    </ScrollView>
  );
}

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